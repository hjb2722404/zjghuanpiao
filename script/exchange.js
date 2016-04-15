/**
 * Created by hjb2722404 on 2016/4/7.
 */
(function(){
    'use strict';
    var myApp = angular.module('zhangJiaGang',[]);
    angular.module('zhangJiaGang')
        .controller('ExchangeController',ExchangeController);

    function ExchangeController($scope,zConfig,exchange){

        $scope.pageTitle = zConfig.pageTitle;
        $scope.orders = [];

        $scope.search = function search(){
            var phone = $scope.phone;
            if(!phone){
                alert("请填写手机号");
                return false;
            }
            getOrders(phone);
        };

        $scope.exchange = function(phone,codeId){
            exChange(phone,codeId);
        };
        function getOrders(phone){
            return exchange.getOrders(phone)
                .then(function(res){
                    $scope.orders = res;
                })
                .catch(function(res){
                    alert(res);
                });
        }

        function exChange(phone,codeId){
            return exchange.exChange(phone,codeId)
                .then(function(res){
                    if(res){
                        alert("兑换成功");
                        getOrders(phone);
                    }else{
                        alert("兑换失败或已经兑换过");
                    }
                })
                .catch(function(res){
                    console.log("5");

                });
        }

    }

    angular.module('zhangJiaGang')
        .constant('zConfig',{
            pageTitle : '张家港智慧旅游微信购票兑票系统'
        });

    angular.module('zhangJiaGang')
        .service('exchange',exchange);


    function exchange($http){
        var service ={
            getOrders : getOrders,
            exChange : exChange
        };

        return service;

        function getOrders(phone){
            var url = 'http://travel.njxuqiang.com/api/order/getRedeemCodeByPhone';
            return $http.get(url+"?phone="+phone)
                .then(getOrderComplete)
                .catch(getOrderFailed);

            function getOrderComplete(res){
                return res.data.data;
            }

            function getOrderFailed(res){
                return res.data.code;
            }
        }

        function exChange(phone,codeId){
            var url = 'http://travel.njxuqiang.com/api/order/updateStateByPhone';
            return $http.get(url+"?phone="+phone+"&codeId="+codeId)
                .then(updataComplete)
                .catch(updataFailed);

            function updataComplete(res){
                return res.data.data;
            }

            function updataFailed(res){
                return res.data.code;
            }
        }
    }



})();