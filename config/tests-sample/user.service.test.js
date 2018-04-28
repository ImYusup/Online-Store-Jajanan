const userService = require('../src/services/user-services')

test('getUser result is array', () => {
    const params =  {}
    userService.getUser(params)
     .then(result => console.log(result))
    // expect(userService.getUser()).toBe();
});