exports.models = {
  "User":{
    "id":"User",
    "required": ["username"],
    "properties":{
      "firstName": {
        "type":"string",
        "description": "The first name of this User."
      },
      "lastName": {
        "type":"string",
        "description": "The last name of this User."
      },
      "username": {
        "type":"string",
        "description": "The username of this User."
      },
      "lastUpdated" :{
        "type":"date",
        "description": "The last time the User was modified."
      }
    }
  }
}
