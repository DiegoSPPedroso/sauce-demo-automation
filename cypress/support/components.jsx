let countTries = 0;

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

        /*  maxlength,
         ariaSelected,
         src,
         alt,
         href,
         disabled = false,
         required = false,
         dropdown = false,
         clear = false,
         beVisible = true,
         attachFile,
         scrollIntoView = false,
         writeForce, */
    } = {}
) => {
    const getLoc = cy.get(locator);

    // Functions to check attributes and properties
    const checkAttribute = (attr, expectedValue) =>
        getLoc.should('have.attr', attr, expectedValue);
    // const checkProperty = (prop, expectedValue) =>
    //     getLoc.should('have.prop', prop, expectedValue);

    // Text and attribute verifications
    if (haveText) getLoc.should('have.text', haveText);
    if (haveNotText) getLoc.should('have.not.text', haveNotText);
    if (contain) getLoc.should('contain', contain);
    if (notContain) getLoc.should('not.contain', contain);
    if (role) checkAttribute('role', role);
    if (type) checkAttribute('type', type);
    if (value) getLoc.should('have.value', value);
    if (placeholder) checkAttribute('placeholder', placeholder);
    if (dataState) checkAttribute('data-state', dataState);
    if (name) checkAttribute('name', name);
    if (autocorrect) checkAttribute('autocorrect', autocorrect);
    if (autocapitalize) checkAttribute('autocapitalize', autocapitalize);
    if (dataIcon) checkAttribute('data-icon', dataIcon);;
    if (viewBox) checkAttribute('viewBox', viewBox);
    if (click) getLoc.click(click === true ? {} : click);
    if (write) getLoc.click().clear().type(write);
    // if (maxlength) checkAttribute('maxlength', maxlength);
    // if (ariaSelected) checkAttribute('aria-selected', ariaSelected);
    // if (src) checkAttribute('src', src);
    // if (alt) checkAttribute('alt', alt);
    // if (href) checkAttribute('href', href);
    // if (disabled) checkProperty('disabled', disabled);
    // if (required) checkProperty('required', required);
    // if (scrollIntoView) getLoc.scrollIntoView();

    // Visibility
    // beVisible ? getLoc.should('be.visible') : getLoc.should('not.be.visible');

    // User actions
    // if (clear) getLoc.clear();
    // if (writeForce)
    //     getLoc
    //         .click({ force: true })
    //         .clear({ force: true })
    //         .type(writeForce, { delay: 50, force: true });
    // if (dropdown) getLoc.realHover().realClick();
    // if (attachFile) {
    //     const filePath =
    //         attachFile?.filePath ||
    //         (typeof attachFile === 'object' && attachFile.filePath);
    //     if (filePath) {
    //         getLoc.attachFile(filePath);
    //     } else {
    //         console.error('filePath not found.');
    //     }
    // }
};