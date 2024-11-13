<script lang="ts">
	import { enhance } from '$app/forms';

	const { form } = $props();
</script>

<main class="flex min-h-screen w-full flex-col items-center justify-center">
	<div class="card w-full max-w-md">
		<div class="card-body">
			<h5 class="card-title">Login</h5>
			<p>Enter your credentials to access your account</p>
			<form class="contents" method="POST" use:enhance>
				<div class="mt-4 flex flex-col">
					<label class="form-control">
						<div class="label">
							<span class="label-text">Username</span>
						</div>
						<input type="text" class="input" name="username" value={form?.username ?? ''} />
					</label>
					<label class="form-control">
						<div class="label">
							<span class="label-text">Password</span>
						</div>
						<input type="password" class="input" name="password" />
					</label>
				</div>
				<div class="card-action mt-4">
					<button class="btn btn-primary btn-block">Login</button>
				</div>
			</form>
		</div>
	</div>
	<div class="text-error mt-2 h-4 w-full max-w-md">{form?.errorMessage}</div>
</main>
