/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return {
			beforeFiles: [
				{
					source: "/_next/:path*",
					has: [
						{
							type: "host",
							value: "app.pod.finance",
						},
					],
					destination: "https://pod.finance/_next/:path*",
				},
				{
					source: "/pod_favicon.png",
					has: [
						{
							type: "host",
							value: "app.pod.finance",
						},
					],
					destination: "https://pod.finance/pod_favicon.png",
				},
				{
					source: "/:path*",
					has: [
						{
							type: "host",
							value: "app.pod.finance",
						},
					],
					destination: "/app/:path*",
				},
			],
			fallback: [
				{
					source: "/_next/:path*",
					has: [
						{
							type: "host",
							value: "app.pod.finance",
						},
					],
					destination: "https://pod.finance/_next/:path*",
				},
			],
		};
	},
	images: {
		domains: ["pod.finance", "app.pod.finance", "cdn.statically.io"],
	},
	async redirects() {
		return [
			{
				source: "/:path*",
				has: [
					{
						type: "host",
						value: "search.pod.finance",
					},
				],
				destination: "https://twitter.com/search?q=%24pod&f=live",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
