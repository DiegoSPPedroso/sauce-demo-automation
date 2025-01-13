// Generic function to verify elements
export const assertElement = (
    locator,
    {
        haveText,
        haveNotText,
        contain,
        notContain,
        type,
        dataState,
        name,
        placeholder,
        autocorrect,
        autocapitalize,
        value,
        dataIcon,
        role,
        viewBox,
        click = false,
        write,
        select
    } = {}
) => {
    const getLoc = cy.get(locator)

    // Functions to check attributes and properties
    const checkAttribute = (attr, expectedValue) =>
        getLoc.should('have.attr', attr, expectedValue)

    // Text and attribute verifications
    if (haveText) getLoc.should('have.text', haveText)
    if (haveNotText) getLoc.should('have.not.text', haveNotText)
    if (contain) getLoc.should('contain', contain)
    if (notContain) getLoc.should('not.contain', contain)
    if (role) checkAttribute('role', role)
    if (type) checkAttribute('type', type)
    if (value) getLoc.should('have.value', value)
    if (placeholder) checkAttribute('placeholder', placeholder)
    if (dataState) checkAttribute('data-state', dataState)
    if (name) checkAttribute('name', name)
    if (autocorrect) checkAttribute('autocorrect', autocorrect)
    if (autocapitalize) checkAttribute('autocapitalize', autocapitalize)
    if (dataIcon) checkAttribute('data-icon', dataIcon)
    if (viewBox) checkAttribute('viewBox', viewBox)
    if (click) getLoc.click(click === true ? {} : click)
    if (write) getLoc.click().clear().type(write)
    if (select) getLoc.select(select)
}