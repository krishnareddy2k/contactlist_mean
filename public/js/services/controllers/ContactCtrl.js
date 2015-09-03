/**
 * Created by KrishnaReddy on 1/2/2015.
 */
var app=angular.module('ContactApp',[]);

app.controller('ContactCtrl',function ContactCtrl($scope,$http){

    var renderContacts=function(res){
        console.log("Response : "+JSON.stringify(res));
        $scope.contacts=res;
    }

    $scope.createContact=function(){

        $http.post('/contacts',$scope.contact)
            .success(function(response){
                $scope.getAll();
            });
    };

    $scope.deleteContact=function(id){
        console.log(id);
        $http.delete('/contacts/'+id)
            .success(function(response){
                $scope.getAll();
            });
    };

    $scope.editContact=function(id){
        console.log(id);
        $http.get('/contacts/'+id)
            .success(function(response){
                console.log("response : "+response);
                $scope.contact=response;
                $scope.getAll();
            });
    };


    $scope.clearContact=function(){
        $scope.contact='';
    }
    $scope.updateContact=function(){
        console.log($scope.contact);
        $http.put("/contacts/"+$scope.contact._id,$scope.contact)
            .success(function(response){
                $scope.getAll();
            });
    }

    $scope.getAll=function(){
       $http.get('/contacts')
           .success(renderContacts);
    }

    $scope.getAll();
});