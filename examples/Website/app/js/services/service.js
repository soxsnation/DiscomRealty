/**
 * Created with JetBrains WebStorm.
 * User: Andrew
 * Date: 6/13/13
 * Time: 7:06 PM
 * To change this template use File | Settings | File Templates.
 */

app.service('daysService', function () {

    this.getDays = function () {
        return days;
    };

    this.insertDay = function (firstName, lastName, city) {
        var topID = days.length + 1;
        days.push({
            id: topID,
            firstName: firstName,
            lastName: lastName,
            city: city
        });
    };

    this.deleteDay = function (id) {
        for (var i = days.length - 1; i >= 0; i--) {
            if (days[i].id === id) {
                days.splice(i, 1);
                break;
            }
        }
    };

    this.getDay = function (id) {
        for (var i = 0; i < days.length; i++) {
            if (days[i].id === id) {
                return days[i];
            }
        }
        return null;
    };


    var days = [
        {
            id: 1, firstName: 'Lee', lastName: 'Carroll', address: '1234 Anywhere St.', city: 'Phoenix',
            orders: [
                { product: 'Basket', price: 29.99, quantity: 1, orderTotal: 29.99 },
                { product: 'Yarn', price: 9.99, quantity: 1, orderTotal: 39.96 },
                { product: 'Needes', price: 5.99, quantity: 1, orderTotal: 5.99 }
            ]
        },
        {
            id: 2, firstName: 'Jesse', lastName: 'Hawkins', address: '89 W. Center St.', city: 'Atlanta',
            orders: [
                { product: 'Table', price: 329.99, quantity: 1, orderTotal: 329.99 },
                { product: 'Chair', price: 129.99, quantity: 4, orderTotal: 519.96 },
                { product: 'Lamp', price: 89.99, quantity: 5, orderTotal: 449.95 },
            ]
        }];

});