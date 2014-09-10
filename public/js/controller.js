/* controller.js
 *
 * Author(s):  Andrew Brown
 * Date:       9/9/2014
 *
 */

/* Controllers */

function HomeController($scope, $http) {
	$scope.monthlyPayment = 0;
	$scope.rate = 3.95;
	$scope.term = 30;
	$scope.price = 450000;
	$scope.downPayment = 0;

	$scope.calculatePayments = function() {
		var t = (($scope.rate / 100 / 12) * ($scope.price - $scope.downPayment));
		var b = (1 - Math.pow(1 + ($scope.rate / 100 / 12), $scope.term * -12));		
		$scope.monthlyPayment =  Math.round(t / b);
	}

	$scope.currentPage = 'Home';
	$scope.intro = 'We\'re glad you\'re here! We have been serving West Volusia and Seminole counties since 1990 providing over 30 years of real estate experience. We pride ourselves on repeat business and referrals from satisfies clients. Come get to know us at Discom Realty and <i>discover</i> our <i>committment</i> to you, our newest neighbor';
};


function AgentController($scope, $http) {
	$scope.currentPage = 'Agent';

	$http.get('data/agents.json').success(function(data) {
		$scope.agents = data;
	});
}

function AboutController($scope, $routeParams, $http) {
	$scope.currentPage = 'About';
}

function CommunityController($scope, $routeParams, $http) {
	$scope.currentPage = 'Community';

	$http.get('data/community.json').success(function(data) {
		$scope.towns = data;
	});
}

function ContactController($scope, $routeParams, $http) {
	$scope.currentPage = 'Contact';

	$scope.address1 = '2845 Enterprise Road, Suite 107-A';
	$scope.address2 = 'DeBary, FL 32713';
	$scope.phone = 'Office: (386) 668-9128';
	$scope.fax = 'Fax: (386) 668-5743';
	$scope.email = 'dhbroker@aol.com';
}