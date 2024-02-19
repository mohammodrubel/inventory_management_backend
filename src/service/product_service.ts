import { T_product } from '../interface/product_interface'
import { Product } from '../model/product_model'

const addNewProductService = async (payload: T_product) => {
  const result = await Product.create(payload)
  return result
}

const getAllProductService = async (query: Record<string, unknown>) => {
  console.log(query)
  const queryObject = { ...query }
  const searchableField = [ 'name']
  let sort = 'price'
  let limit = 10
  let page = 1
  let skip = 0
  let fields = '-__v'


  let searchTerm = ''
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string
  }

  const searchQuery = Product.find({
    
      
        $or: searchableField.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      
      
  })

  const excludeField = [
    'searchTerm',
    'sort',
    'limit',
    'page',
    'fields'
  ]
  excludeField.forEach((el) => delete queryObject[el])

  const filterQuery = searchQuery.find(queryObject)

  if (query.sort) {
    sort = query.sort as string
  }

  const sortQuery = filterQuery.sort(sort)

  if (query?.limit) {
    limit = Number(query.limit)
  }

  if (query?.page) {
    page = Number(query.page)
    skip = (page - 1) * limit
  }

  const paginateQuery = sortQuery.skip(skip)
  const limitQuery = paginateQuery.limit(limit)

  if (query.fields) {
    fields = (query.fields as string)?.split(',').join(' ')
  }

  const countTotal = await Product.countDocuments()
  

  const result = await limitQuery.select(fields)

  return {
    result,
    countTotal
  }
}

const updateProduct = async (id: string, payload: Record<string, unknown>) => {
  const result = await Product.findByIdAndUpdate(id, payload, { new: true })
  return result
}
const deleteProductservice = async (id: string) => {
  const result = await Product.findByIdAndDelete(id)
  return result
}
export const ProductService = {
  addNewProductService,
  getAllProductService,
  updateProduct,
  deleteProductservice,
}
