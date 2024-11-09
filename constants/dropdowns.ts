export const DROPDOWN_LOCATORS = {
  DROPDOWN_LOCATOR_TOURS: [
    { dropDownName:'.nav.navbar-nav >> text=Tours', dropDownSubItems: 'a[href="/travel/tour-type~active~.html"]' },
    { dropDownName:'.nav.navbar-nav >> text=Tours', dropDownSubItems: 'a[href="/travel/tour-type~beach~.html"]' }
  ],
  DROPDOWN_LOCATOR_DESTINATIONS: [
    { dropDownName:'.nav.navbar-nav >> text=Destinations', dropDownSubItems: 'a[href="/travel/destination~northAmerica~.html"]' },
    { dropDownName:'.nav.navbar-nav >> text=Destinations', dropDownSubItems: 'a[href="/travel/destination~southAmerica~.html"]' }
  ]
};

