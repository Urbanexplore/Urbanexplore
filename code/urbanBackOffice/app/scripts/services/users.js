'use strict';

/**
 * @ngdoc service
 * @name sitejsApp.Users
 * @description
 * # Users
 * Service in the sitejsApp.
 */
angular.module('urbanBackOfficeApp')
  .service('UsersService', function Users($filter, utils) {
    // AngularJS will instantiate a singleton by calling 'new' on this function
 	
 	 
     
    //users array to hold list of all users
    var users = [
        {id : 1,userName: 'Dedale1',dateCreate:'12/01/2014', createdBy :'Dédale', nbProject:3,
        email:'dedale@dedale.info', name :'Brouillard', firstname : 'Julien',password : 'xxxx',verification : 'xxxx',
        avatar : 'images/user-default.jpg',
        accountType : [
            {name: 'Edition',              value:'option1',       ischecked: 'false'},
            {name: 'Edition and Management',   value:'option2',    ischecked: 'true'}
        ],
         params:[
            {name: 'Dashbord',          value:'dashbord',       selected: true},
            {name: 'Edition Project',   value:'editProject',    selected: true},
            {name: 'Edition Home Page', value:'editHomePage',   selected: true},
            {name: 'Edition Footer',    value:'editFooter',     selected: true},
            {name: 'Edition Step',      value:'editStep',       selected: true},
            {name: 'Edition Route',     value:'editRoute',      selected: true},
            {name: 'Edition Account',   value:'editAccount',    selected: true},
            {name: 'Manage Profiles',   value:'manageProfiles', selected: false}
            ]},
           
 	 	{id : 2,userName: 'Dedale2', dateCreate:'12/08/2014', createdBy :'Dédale', nbProject:10,
        email:'dedale2@dedale.info', name :'Brouillard2', firstname : 'Julien2',password : 'xxxx',
        accountType : [
            {name: 'Edition',              value:'option1',       ischecked: 'true'},
            {name: 'Edition and Management',   value:'option2',    ischecked: 'false'}
        ],
        params:[
            {name: 'dashbord',    selected: true},
            {name: 'editProject',    selected: false},
            {name: 'editHomePage',    selected: true},
            {name: 'editFooter',    selected: false},
            {name: 'editPath',    selected: true},
            {name: 'editAccount',    selected: true},
            {name: 'manageProfiles',    selected: false}
            ]}
	];

    //save method create a new user if not already exists
    //else update the existing user
    this.save = function (user) {

        if (user.id === null) {
            //if this is new project, add it in projects array
            
            user.id = utils.guid();
            users.push(user);
        }else {
            //for existing project, find this project using id
            //and update it.
            for (var i in users) {
                if (users[i].id === user.id) {
                    users[i] = user;
                }
            }
        }
    };
 
  

    //simply search users list for given id
    //and returns the user object if found
    this.get = function (idUser) {
   
        if((idUser === 'undefined') || (idUser === null)){
            console.log ('idUser null'+ idUser);
            return createNewUser();
        }else{
            for (var i in users) {
                if (users[i].id === idUser) {
                    return users[i];
                }
            }        
        }
 
    };


    
    //iterate through users list and delete
    //user if found
    this.delete = function (id) {
        for (var i in users) {
            if (users[i].id === id) {
                users.splice(i, 1);
            }
        }
    };
    //simply returns the users list
    this.list = function () {
        return users;
    };

  


    function createNewUser (){
        //fabriquer un id et retourner le step
        //var uid = guid();
        var now = new Date();
        var nowFormat = $filter('date')(now, 'dd/MM/yyyy');
        var user = {id : utils.guid(),
            dateCreate: nowFormat, 
            createdBy :'Dédale', 
            nbProject:0,
            accountType : [
                        {name: 'Edition',              value:'option1',       ischecked: 'false'},
                        {name: 'Edition and Management',   value:'option2',    ischecked: 'true'}
                        ],
                     params:[
                        {name: 'Dashbord',          value:'dashbord',       selected: false},
                        {name: 'Edition Project',   value:'editProject',    selected: false},
                        {name: 'Edition Home Page', value:'editHomePage',   selected: false},
                        {name: 'Edition Footer',    value:'editFooter',     selected: false},
                        {name: 'Edition Step',      value:'editStep',       selected: false},
                        {name: 'Edition Route',     value:'editRoute',      selected: false},
                        {name: 'Edition Account',   value:'editAccount',    selected: false},
                        {name: 'Manage Profiles',   value:'manageProfiles', selected: false}
                        ]
        };
        users.push(user);
        return(user);
    }	

  });
