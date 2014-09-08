/**
 * Created with JetBrains WebStorm.
 * User: Andrew
 * Date: 6/7/13
 * Time: 7:28 PM
 * To change this template use File | Settings | File Templates.
 */
var connect = require('connect');
connect.createServer(
    connect.static(__dirname + '/app')
).listen(8124);