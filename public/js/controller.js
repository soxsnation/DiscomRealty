/* controller.js
 *
 * Author(s):  Andrew Brown
 * Date:       9/9/2014
 *
 */

/* Controllers */

function HomeController($scope, $http, $timeout) {
	// $scope.monthlyPayment = 0;
	// $scope.rate = 3.95;
	// $scope.term = 30;
	// $scope.price = 450000;
	// $scope.downPayment = 0;

	// if (2 === "asdfasf'adfasdf\" asdf")

	$scope.calculatePayments = function() {
		console.log('$scope.term: ' + $scope.term + '::');
		if ($scope.price == undefined || $scope.price == '') {
			$scope.morgCalc_Error = 'Please input a price';
			$scope.monthlyPayment = '';
		} else if ($scope.downPayment == undefined || $scope.downPayment == '') {
			$scope.morgCalc_Error = 'Please input a downPayment';
			$scope.monthlyPayment = '';
		} else if ($scope.rate == undefined || $scope.rate == '') {
			$scope.morgCalc_Error = 'Please input a rate';
			$scope.monthlyPayment = '';
		} else if ($scope.term == undefined || $scope.term == '') {
			$scope.morgCalc_Error = 'Please input a term';
			$scope.monthlyPayment = '';
		} else if ($scope.price > $scope.downPayment) {
			$scope.morgCalc_Error = 'Downpayment can not be greater then price';
			$scope.monthlyPayment = '';
		} else {
			$scope.morgCalc_Error = '';
			var t = (($scope.rate / 100 / 12) * ($scope.price - $scope.downPayment));
			var b = (1 - Math.pow(1 + ($scope.rate / 100 / 12), -$scope.term * 12));
			$scope.monthlyPayment = Math.round(t / b);
		}


	}

	$scope.downPayment_update = function() {
		if ($scope.price !== undefined) {
			$scope.loanAmount = Math.round($scope.price - $scope.downPayment);
			$scope.downPaymentPercent = $scope.downPayment / $scope.price * 100;
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
			$scope.downPayment = $scope.price - $scope.loanAmount;
			$scope.downPaymentPercent = $scope.downPayment / $scope.price * 100;
		}
	}

	$scope.price_update = function() {
		if ($scope.downPayment !== undefined) {
			$scope.downPayment_update();
		} else if ($scope.loanAmount !== undefined) {
			$scope.loanAmount_update();
		} else if ($scope.downPaymentPercent !== undefined) {
			$scope.downPaymentPercent_update();
		}
	}

	$scope.currentPage = 'Home';
	$http.get('data/home.json').success(function(data) {
		$scope.intro = data.intro;
		$scope.imagelist = data.images;
		$scope.currentImage = 0;
		$scope.currentImageUrl = $scope.imagelist[$scope.currentImage];
	});

	var agentList = [];
	$scope.agents = [];
	$scope.agent = {};
	$http.get('data/agents.json').success(function(data) {
		for (var i = 0; i < data.length; ++i) {
			if (data[i].active === true) {
				agentList.push(data[i]);
				// $scope.agents.push(data[i]);				
			}
		}
		$scope.agents = agentList;
		// console.log($scope.agents);
		$scope.agent = agentList[0];
	});

	

	$scope.counter = 0;
	$scope.onTimeout = function() {
		console.log('onTimeout');
		// update_images();
		if ($scope.counter >= agentList.length - 1) {
			$scope.counter = 0;
		} else {
			$scope.counter++;
		}
		$scope.agent = agentList[$scope.counter];
		mytimeout = $timeout($scope.onTimeout, 15000);
	}
	var mytimeout = $timeout($scope.onTimeout, 15000);
	

	$scope.stop = function() {
		$timeout.cancel(mytimeout);
	}

	function update_images() {
		$scope.currentImage ++;
		if ($scope.currentImage >= $scope.imagelist.length) { $scope.currentImage = 0; }

		$scope.currentImageUrl = $scope.imagelist[$scope.currentImage];		
	}

	$scope.onImageTimeout = function() {
		console.log('onImageTimeout');
		update_images();
		myImgTimeout = $timeout($scope.onImageTimeout, 10000);
	}

	$scope.next_img = function() {
		$timeout.cancel(myImgTimeout);
		update_images();
		myImgTimeout = $timeout($scope.onImageTimeout, 10000);
	}
	var myImgTimeout = $timeout($scope.onImageTimeout, 10000);

	// var updateAgent;
	// updateAgent = $interval(function() {
	// 	$scope.intro = 'asdf';
	// },1000);


	// $scope.intro = 'We\'re glad you\'re here! We have been serving West Volusia and Seminole counties since 1990 providing over 30 years of real estate experience. We pride ourselves on repeat business and referrals from satisfies clients. Come get to know us at Discom Realty and <i>discover</i> our <i>committment</i> to you, our newest neighbor';
};


function AgentController($scope, $http) {
	$scope.currentPage = 'Agent';
	$scope.agents = [];

	// $http.put('data/contact.json', 'contactInfo').success(function(data) {
	// 	$scope.header_text = 'saved'
	// });

	$http.get('data/agents.json').success(function(data) {
		var agentList = [];
		for (var i = 0; i < data.length; ++i) {
			if (data[i].active === true) {
				$scope.agents.push(data[i]);
			}
		}

	});

	$http.get('data/agents_text.json').success(function(data) {
		$scope.header_text = data.header_text;
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
			

			var emailObj = {
				firstname: $scope.firstname,
				lastname: $scope.lastname,
				email: $scope.email,
				phonenumber: $scope.phonenumber,
				comments: $scope.comments
			};

			$http.post('/api/email', emailObj).success(function(data) {
				alert('Email Sent from ' + $scope.firstname + ' ' + $scope.lastname);
			}).error(function(err){
				alert('ERROR:: Sending Email from ' + $scope.firstname + ' ' + $scope.lastname);
			});


		}

	}

	$scope.map = {
		center: {
			latitude: 28.899627,
			longitude: -81.285907
		},
		zoom: 14,
		title: 'Discom Realty'
	};

	$scope.map_options = {
		scrollwheel: true
	};

	$scope.marker = {
		id: 0,
		coords: {
			latitude: 28.899626,
			longitude: -81.285908
		},
		options: {
			draggable: true
		},
		events: {
			dragend: function(marker, eventName, args) {
				console.log('marker dragend');
			}
		}
	}


	// $scope.marker = {
	// 	id: 0,
	// 	coords: {
	// 		latitude: 28.899626,
	// 		longitude: -81.285908
	// 	},
	// 	show: false
	// };
	// $scope.title = "Window Title!";

}

function ListingsController($scope, $routeParams, $http) {
	$scope.currentPage = 'About';
	$scope.listingtableurl = 'http://mfr.mlsmatrix.com/Matrix/public/IDX.aspx?idx=51fb476';
}

function ListingSearchController($scope, $routeParams, $http) {
	$scope.currentPage = 'About';
}