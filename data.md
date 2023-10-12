cart = [
    {
        product: '',
        quntity: '',
        price: '';
        user: ''
    }
]
order ={
    orderItems=[{
        product:'',
        quntity:''
    }],
    totalPrice= '',
    status: ''
}
try {
      if (response.status == 200) {
        setProductsData(response.data)
        const productIds = state.map(e => e.product);
        const product = productIds.map(e => {
          e.filter(item => {
            return item.id == productIds
          }
          )
        })
        setProductData('product', product)
        console.log('product',product);
      } else {
        setErrorMessage('Error occured!')
      }
    } catch (error) {
      setErrorMessage(error.message)
    }