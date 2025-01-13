import { assertElement } from "../support/components"
import { getProducts } from "../support/get_products"
import { login } from "../support/login"

const verifyItems = (products) => {
    products.forEach((products, index) => {
        cy.get(`.inventory_item:nth-child(${index + 1})`).within(() => {
            assertElement('.inventory_item_img img', { src: products.image })
            assertElement('.inventory_item_name', { haveText: products.name })
            assertElement('.inventory_item_desc', { haveText: products.description })
            assertElement('.inventory_item_price', { contain: products.price })
            assertElement('.btn_primary', { haveText: 'ADD TO CART' })
        })
    })
}

describe('Sauce Demo', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/v1/')
        login()
    })

    it('Verify inventory screen with standardUser', () => {
        assertElement('.product_label', { haveText: 'Products' })
        assertElement('.shopping_cart_link', { href: './cart.html' })
        assertElement('.svg-inline--fa', { dataIcon: 'shopping-cart', role: 'img', viewBox: '0 0 576 512' })

        // Verify A to Z
        assertElement('.product_sort_container', { value: 'az', select: 'Name (A to Z)' })
        getProducts().then((productsAtoZ) => {
            verifyItems(productsAtoZ)
        })

        // Verify Z to A
        assertElement('.product_sort_container', { value: 'az', select: 'Name (Z to A)' })
        getProducts().then((productsZtoA) => {
            verifyItems(productsZtoA)
        })

        // Verify Preço Low to High
        assertElement('.product_sort_container', { value: 'za', select: 'Price (low to high)' })
        getProducts().then((productsLtoH) => {
            verifyItems(productsLtoH)
        })

        // Verify Preço High to Low
        assertElement('.product_sort_container', { value: 'lohi', select: 'Price (high to low)' })
        getProducts().then((productsHtoL) => {
            verifyItems(productsHtoL)
        })
        assertElement('.social_twitter', { haveText: 'Twitter' })
        assertElement('.social_facebook', { haveText: 'Facebook' })
        assertElement('.social_linkedin', { haveText: 'LinkedIn' })
        assertElement('.footer_copy', { haveText: '© 2020 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy' })
        assertElement('.footer_robot', { src: 'img/SwagBot_Footer_graphic.png' })
    })
})
