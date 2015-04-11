module.exports = function(swagger){

  var fetchUsers = {
    'spec': {
      "description" : "Fetches all users.",
      "path" : "/users",
      "notes" : "Returns all users.",
      "summary" : "Retrieve a list of all users.",
      "method": "GET",
      "type" : "User",
      "nickname" : "fetchUsers"
    },
    'action': function (req,res) {

      require('../models/user').find(function(err, users) {
        if (err) {
          res.send(err);
        } else {
          res.json(users);
        }
      });

    }
  };

  swagger.addGet(fetchUsers);

}
