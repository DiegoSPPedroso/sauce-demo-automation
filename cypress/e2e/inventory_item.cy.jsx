import { assertElement } from "../support/components"
import { getProducts } from "../support/get_products"
import { login } from "../support/login"

const verifyItems = (product) => {
    assertElement(`.inventory_item:nth-child(${product.index}) .inventory_item_label > a > .inventory_item_name`, { haveText: product.name, click: true })
    cy.url().should('eq', `https://www.saucedemo.com/v1/inventory-item.html?id=${product.id}`)
    assertElement('.inventory_details_name', { haveText: product.name })
    assertElement('.inventory_details_desc', { haveText: product.description })
    assertElement('.inventory_details_price', { haveText: product.price })
    assertElement('.inventory_details_img', { src: product.image })
    assertElement('.btn_primary', { haveText: 'ADD TO CART' })
    assertElement('.inventory_details_back_button', { haveText: '<- Back', click: { force: true } })
}

describe('Sauce Demo', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/v1/')
        login()
    })

    it('Verify inventory item with standardUser', () => {
        assertElement('.product_label', { haveText: 'Products' })
        getProducts().then((products) => {
            products.forEach((product) => {
                verifyItems(product)
            })
        })
    })
})
