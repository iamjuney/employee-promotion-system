<script>
	import { Button, Modal } from 'flowbite-svelte';
	import FuzzySet from '$lib/Fuzzy';

	let resultModal = false;
	let helpModal = false;
	let result = '';

	function onSubmit(e) {
		const data = new FormData(e.target);

		const ability_score = [
			data.get('ability1'),
			data.get('ability2'),
			data.get('ability3'),
			data.get('ability4'),
			data.get('ability5')
		];
		const loyalty_score = [
			data.get('loyalty1'),
			data.get('loyalty2'),
			data.get('loyalty3'),
			data.get('loyalty4'),
			data.get('loyalty5')
		];

		// get average for each array
		const ability_avg =
			ability_score.reduce((a, b) => parseInt(a) + parseInt(b)) / ability_score.length;
		const loyalty_avg =
			loyalty_score.reduce((a, b) => parseInt(a) + parseInt(b)) / loyalty_score.length;

		const fuzzySet = new FuzzySet();
		result = fuzzySet.Defuzzify(ability_avg, loyalty_avg);

		if (result !== '') {
			resultModal = true;
		}
	}
</script>

<div class="mx-auto min-h-screen min-w-full pt-16 pb-20">
	<div
		class="max-w-4xl mx-auto py-6 sm:px-6 lg:p-8 rounded-lg ring-1 ring-gray-900 ring-opacity-5 bg-gray-50 shadow"
	>
		<form method="POST" on:submit|preventDefault={onSubmit}>
			<div class="flex flex-row justify-between mt-4">
				<h1 class="text-3xl font-bold text-gray-900">
					Assessment <span class="text-indigo-600">Criteria</span>
				</h1>
				<Button
					on:click={() => (helpModal = true)}
					btnClass="rounded-full bg-transparent text-indigo-600 hover:text-indigo-900 w-6 h-6"
					title="Assessment Criteria"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
						/>
					</svg>
				</Button>
				<Modal bind:open={helpModal} size="md">
					<div class="px-4 py-5 sm:px-6">
						<h3 class="text-lg leading-6 font-medium text-gray-900">Assessment Criteria</h3>
						<p class="mt-1 max-w-2xl text-sm text-gray-500">
							The scoring system uses a <strong>0 to 100</strong> scale. Using Mamdani Fuzzy logic, the
							average score of each criterion will be the determinant variable of employee eligibility
							to get promotion.
						</p>
					</div>
					<div class="border-t border-gray-200">
						<dl>
							<div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
								<dt class="mt-1 text-sm font-bold text-gray-900 sm:mt-0">Criteria</dt>
								<dd class="mt-1 text-sm font-bold text-gray-900 sm:mt-0">Sub criteria</dd>
								<dd class="mt-1 text-sm font-bold text-gray-900 sm:mt-0 sm:col-span-2">
									Description
								</dd>
							</div>
							<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">1. Ability</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0">Job Knowledge</dd>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									Job description an individual needs to know so as to achieve a satisfactory
									achievement
								</dd>
							</div>
							<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500" />
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0">Dependability</dd>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									The ability to perform well under minimum supervision
								</dd>
							</div>
							<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500" />
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0">Performance Under Pressure</dd>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									The ability to remain calm under pressure and in a crisis situation
								</dd>
							</div>
							<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500" />
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0">Interpersonal Relationship</dd>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									The ability to work collaboratively
								</dd>
							</div>
							<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500" />
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0">Creativity</dd>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									The ability to generate new ideas
								</dd>
							</div>
							<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">2. Loyalty</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0">Quantity of Work</dd>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									The amount of work an individual can do within a working day
								</dd>
							</div>
							<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500" />
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0">Attendance</dd>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									Having good attendance records
								</dd>
							</div>
							<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500" />
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0">Accuracy</dd>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									Offering accurate performance
								</dd>
							</div>
							<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500" />
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0">Housekeeping</dd>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									Cleanliness and order in the work area
								</dd>
							</div>
							<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500" />
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0">Courtesy</dd>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									Being polite to others
								</dd>
							</div>
						</dl>
					</div>
				</Modal>
			</div>
			<Modal bind:open={resultModal} size="xs" autoclose>
				{#if result === 'Eligible'}
					<div class="text-center">
						<svg
							aria-hidden="true"
							class="mx-auto mb-4 w-14 h-14 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m2 12l5.25 5l2.625-3M8 12l5.25 5L22 7m-6 0l-3.5 4"
							/></svg
						>
						<h3 class="mb-5 text-lg font-normal text-gray-900 dark:text-gray-400">
							The Employee is Eligible for promotion.
						</h3>
					</div>
				{:else if result === 'Not Eligible'}
					<div class="text-center">
						<svg
							aria-hidden="true"
							class="mx-auto mb-4 w-14 h-14 text-red-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-width="2"
								d="M20 20L4 4m16 0L4 20"
							/></svg
						>
						<h3 class="mb-5 text-lg font-normal text-gray-900 dark:text-gray-400">
							The Employee is Not Eligible for promotion.
						</h3>
					</div>
				{:else}
					<p>just right!</p>
				{/if}
			</Modal>

			<div class="hidden sm:block" aria-hidden="true">
				<div class="py-5">
					<div class="border-t border-gray-200" />
				</div>
			</div>

			<div class="md:grid md:grid-cols-3 md:gap-6 mt-8">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg font-medium leading-6 text-gray-900">Ability</h3>
						<p class="mt-1 text-sm text-gray-600">
							Ability to work to implement the vision and mission of the Company.
						</p>
					</div>
				</div>
				<div class="mt-5 md:mt-0 md:col-span-2">
					<div class="shadow sm:rounded-md sm:overflow-hidden">
						<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
							<div class="grid grid-cols-3 gap-6">
								<div class="col-span-3 sm:col-span-2">
									<label for="ability1" class="block text-sm font-medium text-gray-700">
										Job Knowledge
									</label>
									<div class="mt-1 flex rounded-md shadow-sm">
										<input
											type="number"
											name="ability1"
											class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
											placeholder="1-100"
											min="0"
											max="100"
											required
										/>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-3 gap-6">
								<div class="col-span-3 sm:col-span-2">
									<label for="ability2" class="block text-sm font-medium text-gray-700">
										Dependability
									</label>
									<div class="mt-1 flex rounded-md shadow-sm">
										<input
											type="number"
											name="ability2"
											class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
											placeholder="1-100"
											min="0"
											max="100"
											required
										/>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-3 gap-6">
								<div class="col-span-3 sm:col-span-2">
									<label for="ability3" class="block text-sm font-medium text-gray-700">
										Performance Under Pressure
									</label>
									<div class="mt-1 flex rounded-md shadow-sm">
										<input
											type="number"
											name="ability3"
											class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
											placeholder="1-100"
											min="0"
											max="100"
											required
										/>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-3 gap-6">
								<div class="col-span-3 sm:col-span-2">
									<label for="ability4" class="block text-sm font-medium text-gray-700">
										Interpersonal Relationship
									</label>
									<div class="mt-1 flex rounded-md shadow-sm">
										<input
											type="number"
											name="ability4"
											class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
											placeholder="1-100"
											min="0"
											max="100"
											required
										/>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-3 gap-6">
								<div class="col-span-3 sm:col-span-2">
									<label for="ability5" class="block text-sm font-medium text-gray-700">
										Creativity
									</label>
									<div class="mt-1 flex rounded-md shadow-sm">
										<input
											type="number"
											name="ability5"
											class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
											placeholder="1-100"
											min="0"
											max="100"
											required
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="hidden sm:block" aria-hidden="true">
				<div class="py-5">
					<div class="border-t border-gray-200" />
				</div>
			</div>

			<div class="md:grid md:grid-cols-3 md:gap-6">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg font-medium leading-6 text-gray-900">Loyalty</h3>
						<p class="mt-1 text-sm text-gray-600">
							Loyal to the values and to the vision, ensuring that the goals of the company will be
							achieved
						</p>
					</div>
				</div>
				<div class="mt-5 md:mt-0 md:col-span-2">
					<div class="shadow sm:rounded-md sm:overflow-hidden">
						<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
							<div class="grid grid-cols-3 gap-6">
								<div class="col-span-3 sm:col-span-2">
									<label for="loyalty1" class="block text-sm font-medium text-gray-700">
										Quantity of Work
									</label>
									<div class="mt-1 flex rounded-md shadow-sm">
										<input
											type="number"
											name="loyalty1"
											class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
											placeholder="1-100"
											min="0"
											max="100"
											required
										/>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-3 gap-6">
								<div class="col-span-3 sm:col-span-2">
									<label for="loyalty2" class="block text-sm font-medium text-gray-700">
										Attendance
									</label>
									<div class="mt-1 flex rounded-md shadow-sm">
										<input
											type="number"
											name="loyalty2"
											class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
											placeholder="1-100"
											min="0"
											max="100"
											required
										/>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-3 gap-6">
								<div class="col-span-3 sm:col-span-2">
									<label for="loyalty3" class="block text-sm font-medium text-gray-700">
										Accuracy
									</label>
									<div class="mt-1 flex rounded-md shadow-sm">
										<input
											type="number"
											name="loyalty3"
											class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
											placeholder="1-100"
											min="0"
											max="100"
											required
										/>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-3 gap-6">
								<div class="col-span-3 sm:col-span-2">
									<label for="loyalty4" class="block text-sm font-medium text-gray-700">
										Housekeeping
									</label>
									<div class="mt-1 flex rounded-md shadow-sm">
										<input
											type="number"
											name="loyalty4"
											class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
											placeholder="1-100"
											min="0"
											max="100"
											required
										/>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-3 gap-6">
								<div class="col-span-3 sm:col-span-2">
									<label for="loyalty5" class="block text-sm font-medium text-gray-700">
										Courtesy
									</label>
									<div class="mt-1 flex rounded-md shadow-sm">
										<input
											type="number"
											name="loyalty5"
											class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
											placeholder="1-100"
											min="0"
											max="100"
											required
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="flex flex-row-reverse my-8">
				<button
					type="submit"
					class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Submit
				</button>
			</div>
		</form>
	</div>
</div>
