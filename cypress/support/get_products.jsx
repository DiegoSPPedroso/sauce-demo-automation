// Function to get products on A to Z order
export const getProducts = () => {
    return cy.get('.inventory_item').then((items) => {
        const products = []
        items.each((index, item) => {
            const productName = Cypress.$(item).find('.inventory_item_name').text()
            const productDesc = Cypress.$(item).find('.inventory_item_desc').text()
            const productPrice = Cypress.$(item).find('.inventory_item_price').text()
            const productImage = Cypress.$(item).find('.inventory_item_img img').attr('src')

            products.push({
                name: productName,
                description: productDesc,
                price: productPrice,
                image: productImage
            })
        })

        return products
    })
}