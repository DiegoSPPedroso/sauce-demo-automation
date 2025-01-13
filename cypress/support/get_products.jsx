// Function to get products
export const getProducts = () => {
    return cy.get('.inventory_item').then((items) => {
        const products = []

        items.each((index, item) => {
            const productId = Cypress.$(item).find('.inventory_item_img a').attr('href').match(/id=(\d+)/)[1]
            const productName = Cypress.$(item).find('.inventory_item_name').text()
            const productDesc = Cypress.$(item).find('.inventory_item_desc').text()
            const productPrice = Cypress.$(item).find('.inventory_item_price').text()
            const productImage = Cypress.$(item).find('.inventory_item_img img').attr('src')

            products.push({
                id: productId,
                name: productName,
                description: productDesc,
                price: productPrice,
                image: productImage,
                index: index + 1
            })
        })

        return products
    })
}
