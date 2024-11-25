<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Alert } from '$lib/components/ui/alert';
	import { Input } from '@components/ui/input';
	import { Label } from '@components/ui/label';

	const { form } = $props();
</script>

<main class="flex min-h-screen w-full flex-col items-center justify-center">
	<form class="contents" method="POST" use:enhance>
		<Card>
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>Enter your credentials to access your account</CardDescription>
			</CardHeader>
			<CardContent class="flex w-[360px] flex-col space-y-4">
				<div class="flex flex-col space-y-1">
					<Label for="username">Username</Label>
					<Input id="username" name="username" />
				</div>
				<div class="flex flex-col space-y-1">
					<Label for="password">Password</Label>
					<Input type="password" id="password" name="password" />
				</div>
			</CardContent>
			<CardFooter>
				<Button type="submit" class="w-full">Submit</Button>
			</CardFooter>
		</Card>
	</form>

	<div class="mt-4 h-6 w-[364px]">
		{#if form?.errorMessage}
			<Alert variant="destructive">{form?.errorMessage}</Alert>
		{/if}
	</div>
</main>
