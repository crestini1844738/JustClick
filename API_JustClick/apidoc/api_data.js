define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "API_JustClick/apidoc/main.js",
    "group": "/home/emanuele/Desktop/progetti/JustClick/API_JustClick/apidoc/main.js",
    "groupTitle": "/home/emanuele/Desktop/progetti/JustClick/API_JustClick/apidoc/main.js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/api/getPopolari",
    "title": "GetPopolari: Returns popular courses",
    "name": "GetPopolari",
    "description": "<p>gets all the popular courses returned in a JSON file</p> <p>example object: { corsi: [ {course1...},{course2...}, ...]}</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404PopularError",
            "description": "<p>No popular courses found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"No Popular Courses Found\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X GET http://localhost:8889/api/getPopolari",
        "type": "curl"
      }
    ],
    "group": "Courses",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  'content-type': 'application/json'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Course",
            "description": "<p>Object that conatins a list with all popular courses</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"courseName\": \"sampleCourse\",\n  \"author\": \"Valerio\",\n  \"category\": \"Informatica\",\n  \"followers\": 0,\n  ...\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "API_JustClick/API_JustClick.js",
    "groupTitle": "Courses",
    "sampleRequest": [
      {
        "url": "http://localhost:8889/api/getPopolari"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/corsiUtente",
    "title": "GetCorsiUtente: Returns a user's courses",
    "name": "GetCorsiUtente",
    "description": "<p>returns the json file with the courses data of the specified user</p> <p>example object: { courses: [{corso1...},{corso2...} ...]}</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404PopularError",
            "description": "<p>User not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Users",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X POST http://localhost:8889/api/corsiUtente?username=prova1",
        "type": "curl"
      }
    ],
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  'content-type': 'application/json'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Course",
            "description": "<p>Object that conatins the courses data of a specified user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"id\": \"123456\",\n  \"rev\": \"a1b2c3\",\n  \"courseName\": \"Name\",\n  \"desc\": desc,\n  ...\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "API_JustClick/API_JustClick.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "http://localhost:8889/api/corsiUtente"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/profiloUtente",
    "title": "GetPofiloUtente: Returns a user's profile",
    "name": "GetProfiloUtente",
    "description": "<p>returns the json file with the specified user data</p> <p>example object: { user: {info1,info2, ...}}</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404PopularError",
            "description": "<p>User not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Users",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X POST http://localhost:8889/api/profiloUtente?username=prova55",
        "type": "curl"
      }
    ],
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  'content-type': 'application/json'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "User",
            "description": "<p>Object that conatins the data of a user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"username\": \"Username\",\n  \"Name\": \"NameUser\",\n  \"Surname\": \"SurnameUser\",\n  \"Email\": emailUser@mail.domain,\n  ...\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "API_JustClick/API_JustClick.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "http://localhost:8889/api/profiloUtente"
      }
    ]
  }
] });
