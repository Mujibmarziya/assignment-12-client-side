import React from 'react';

const Features = () => {
    return (
        <div>
            <section className="m-4 md:m-8 bg-slate-100 dark:bg-gray-100 dark:text-gray-800">
	<div className="container p-4 mx-auto my-6 space-y-1 text-center">
		
		<h2 className="pb-3 text-3xl font-bold md:text-4xl">Our All features.</h2>
		<p>Get a jumpstart to creating your new career! With our various tasks, you can perform them and earn god amount of money.</p>
	</div>
	<div className="container grid justify-center gap-4 mx-auto lg:grid-cols-2 xl:grid-cols-4">
		<div className="flex flex-col px-8 py-6">
			<h2 className="mb-2 text-lg font-semibold sm:text-xl title-font dark:text-gray-800">Earn Coins by Completing Tasks</h2>
			<p className="flex-1 mb-4 text-base leading-relaxed dark:text-gray-600">Boost your earnings with our rewards program: complete tasks and earn coins that can be redeemed for exciting prizes and benefits</p>
			<a className="inline-flex items-center space-x-2 text-sm dark:text-violet-600" href="/components">
				<span>Learn More</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
					<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
				</svg>
			</a>
		</div>
		<div className="flex flex-col px-8 py-6 lg:border-none xl:border-solid">
			<h2 className="mb-2 text-lg font-semibold sm:text-xl title-font dark:text-gray-800">Create and Manage Tasks</h2>
			<p className="flex-1 mb-4 text-base leading-relaxed dark:text-gray-600">Streamline your workflow effortlessly by creating and managing tasks in our intuitive platform, ensuring you stay organized and productive..</p>
			<a className="inline-flex items-center space-x-2 text-sm dark:text-violet-600" href="/sections">
				<span>Learn More</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
					<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
				</svg>
			</a>
		</div>
		<div className="flex flex-col px-8 py-6">
			<h2 className="mb-2 text-lg font-semibold sm:text-xl title-font dark:text-gray-800">Secure Payments</h2>
			<p className="flex-1 mb-4 text-base leading-relaxed dark:text-gray-600">Experience peace of mind with our secure payment system, designed to protect your transactions with top-notch encryption and fraud prevention measures.</p>
			<a className="inline-flex items-center space-x-2 text-sm dark:text-violet-600" href="/templates">
				<span>Learn More</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
					<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
				</svg>
			</a>
		</div>
		<div className="flex flex-col px-8 py-6">
			<h2 className="mb-2 text-lg font-semibold sm:text-xl title-font dark:text-gray-800">Guarantee to good life</h2>
			<p className="flex-1 mb-4 text-base leading-relaxed dark:text-gray-600">Experience peace of mind with our secure payment system, designed to protect your transactions with top-notch encryption and fraud prevention measures.</p>
			<a className="inline-flex items-center space-x-2 text-sm dark:text-violet-600" href="/docs">
				<span>Learn More</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
					<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
				</svg>
			</a>
		</div>
	</div>
</section>
        </div>
    );
};

export default Features;