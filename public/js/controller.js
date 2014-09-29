/* controller.js
 *
 * Author(s):  Andrew Brown
 * Date:       9/9/2014
 *
 */

/* Controllers */

function HomeController($scope, $http) {
	// $scope.monthlyPayment = 0;
	// $scope.rate = 3.95;
	// $scope.term = 30;
	// $scope.price = 450000;
	// $scope.downPayment = 0;

	$scope.calculatePayments = function() {
		console.log('$scope.price: ' + $scope.price);
		if ($scope.price == undefined) {
			$scope.morgCalc_Error = 'Please input a price';
			$scope.monthlyPayment = '';
		}
		else if ($scope.downPayment == undefined) {
			$scope.morgCalc_Error = 'Please input a downPayment';
			$scope.monthlyPayment = '';
		}
		else if ($scope.rate == undefined) {
			$scope.morgCalc_Error = 'Please input a rate';
			$scope.monthlyPayment = '';
		}
		else if ($scope.term == undefined) {
			$scope.morgCalc_Error = 'Please input a term';
			$scope.monthlyPayment = '';
		}
		else {
			$scope.morgCalc_Error = '';
			var t = (($scope.rate / 100 / 12) * ($scope.price - $scope.downPayment));
			var b = (1 - Math.pow(1 + ($scope.rate / 100 / 12), -$scope.term * 12));
			$scope.monthlyPayment = Math.round(t / b);
		}

		
	}

	$scope.downPayment_update = function() {
		if ($scope.price !== undefined) {
			$scope.loanAmount = $scope.price - $scope.downPayment;
			$scope.downPaymentPercent = $scope.price / $scope.downPayment * 100;
		}
	}

	$scope.downPaymentPercent_update = function() {
		if ($scope.price !== undefined) {
			$scope.downPayment = $scope.price * $scope.downPaymentPercent / 100;
			$scope.loanAmount = $scope.price - $scope.downPayment;
		}
	}

	$scope.loanAmount_update = function() {
		if ($scope.loanAmount !== undefined) {
			$scope.downPayment = $scope.price + $scope.loanAmount;
			$scope.downPaymentPercent = $scope.price / $scope.downPayment * 100;
		}
	}

	$scope.price_update = function() {
		if ($scope.downPayment !== undefined) {
			$scope.downPayment_update();
		}
		else if ($scope.loanAmount !== undefined) {
			$scope.loanAmount_update();
		}
		else if ($scope.downPaymentPercent !== undefined) {
			$scope.downPaymentPercent_update();
		}
	}

	$scope.currentPage = 'Home';
	$scope.intro = 'We\'re glad you\'re here! We have been serving West Volusia and Seminole counties since 1990 providing over 30 years of real estate experience. We pride ourselves on repeat business and referrals from satisfies clients. Come get to know us at Discom Realty and <i>discover</i> our <i>committment</i> to you, our newest neighbor';
};


function AgentController($scope, $http) {
	$scope.currentPage = 'Agent';

	$http.put('data/contact.json', 'contactInfo').success(function(data) { 
		$scope.header_text = 'saved'
	});

	$http.get('data/agents.json').success(function(data) {
		$scope.agents = data;
	});

	// $http.get('data/agents_text.json').success(function(data) {
	// 	$scope.header_text = data.header_text;
	// });
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

	$scope.discomaddress1 = '2845 Enterprise Road, Suite 107-A';
	$scope.discomaddress2 = 'DeBary, FL 32713';
	$scope.discomphone = 'Office: (386) 668-9128';
	$scope.discomfax = 'Fax: (386) 668-5743';
	$scope.discomemail = 'dhbroker@aol.com';

	$scope.sendEmail = function() {

		if ($scope.firstname == '' || $scope.firstname == undefined) {
			$scope.error = 'Please enter your firstname';
		} else if ($scope.lastname == '' || $scope.lastname == undefined) {
			$scope.error = 'Please enter your lastname';
		} else if ($scope.email === '' || $scope.email == undefined) {
			$scope.error = 'Please enter your email address';
		} else if ($scope.comments === '' || $scope.comments == undefined) {
			$scope.error = 'Please tell us how we can help you';
		} else {
			alert('Sending Email from ' + $scope.firstname + ' ' + $scope.lastname);
		}

	}



}

function ListingsController($scope, $routeParams, $http) {
	$scope.currentPage = 'About';
	$scope.listingtableurl = 'http://mfr.mlsmatrix.com/Matrix/public/IDX.aspx?idx=51fb476';
}

function ListingSearchController($scope, $routeParams, $http) {
	$scope.currentPage = 'About';
}