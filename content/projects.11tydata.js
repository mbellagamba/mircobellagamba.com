export default {
	companies: [
		{
			name: "Crea-D",
			projects: [
				{
					title: "Smartrekking",
					date: "2015-06-15",
					summary:
						"It is an app for urban trekking, it suggests itineraries to visit places according to your position and time",
					tags: "android java php",
					icon: "smartrekking.png",
					description: `This is the first project I have done as a freelance. I developed the native Android app and the PHP Rest API. In this project I have used and learned many of the APIs of the Android operating system: from Activities and XML layouts to SQLite and file system but also Intents, background tasks, Receivers, Google Maps, GeoFence API. This project is now archived.`,
				},
			],
		},
		{
			name: "Nautes",
			projects: [
				{
					title: "GETApp Fradeani",
					date: "2016-11-02",
					summary:
						"The Guided Esthetic Treatment app is intended to guide the dentist through each step of the prosthetic treatment plan",
					tags: "ios swift xcode coredata uikit",
					icon: "fradeani-getapp.png",
					url: "https://www.getappfradeani.com/",
					description: `I developed the native iOS app using the Swift Language, Core Data, and UIKit. The core of this app is a dynamic set of linked forms. The following list is a requirements overview.
			
					1. Each form is displayed only if the data on the previously completed forms meets some pre-conditions.
					2. A form may depend on the data of some fields on previously filled in forms.
					3. Each form needs to be validated before proceeding to the next form.
					4. If updating an intermediate form, proceeding to the next step requires a cascade update.
			
					The solution I found is a completely platform independent recursive algorithm - we used the same algorithm for the Android app.`,
				},
				{
					title: "Toyota Web Interactive Dashboard",
					date: "2017-06-15",
					summary:
						"Data analytics platform showing complex charts with filters and several aggregation levels",
					tags: "react javascript c-sharp entityframework",
					icon: "toyota-wid.png",
					description: `I designed and developed the REST API serving the React frontend to which I contributed partially. ASP.NET Web API heavily leverages Entity Framework and Linq. It also retrieves and processes data from an instance of Microsoft Analysis Services.`,
				},
				{
					title: "Imprinting",
					date: "2018-11-10",
					summary:
						"An HR tech platform that allows top managers to share videos and receive feedbacks",
					tags: "c-sharp aspnetcore aws",
					icon: "imprinting.png",
					url: "https://www.humananalyticslabs.com/",
					description: `I designed and developed the AWS cloud serverless architecture made of C# lambda functions. Data is stored on DynamoDB, files and videos on S3. Videos are compressed using Elastic Transcoder.`,
				},
				{
					title: "Esitur ios app",
					date: "2019-01-31",
					summary:
						"Tour operator app that allows you to connect with your travel organizer and other travelers",
					tags: "swift ios xcode",
					icon: "esitur.png",
					url: "https://apps.apple.com/it/app/esitur/id993606471",
					description: `I developed the native iOS app, using the Swift language and iOS Storyboards. Push notifications, image sharing and real time chat are some of the most interesting app capabilities.`,
				},
				{
					title: "Feedbackloop",
					date: "2019-09-10",
					summary:
						"HR tech platform for sending and receiving feedback between colleagues in a corporate environment",
					tags: "c-sharp aws serverless react react-native",
					icon: "feedbackloop.png",
					url: "https://www.feedbackloop.eu/",
					description: `The FeedbackLoop platform backing the React Native app is completely serverless and cloud native. I designed the AWS cloud architecture involving the orchestration of several services like AWS Lambda, RDS Aurora Serverless, S3, CloudFront, Cognito, CloudWatch, API Gateway, VPC. Lambda functions runs C# code on .NET Core runtime. The React Native app uses JavaScript, Redux, AWS Amplify, Styled Components, Jest, Enzyme.`,
				},
			],
		},
		{
			name: "Madisoft",
			projects: [
				{
					title: "Nuvola",
					date: "2020-09-10",
					summary: "Parents and students personal area",
					tags: "typescript react jest",
					icon: "nuvola-ts.png",
					url: "https://nuvola.madisoft.it/",
					description: `I worked on the renewal of the parents and students area. The project involved developing a new React Native app and a complete rewrite of the web app. Both the mobile and web apps share the same core technologies: written in TypeScript, React with Hooks and Context API for state management, Jest and Testing Library as testing tools. For the web app, we adopted a micro-frontend approach for flexible integration with legacy code and an independent deploy pipeline.`,
				},
			],
		},
	],
};
