<header class="bg-primary w-full px-8">
	<div class="flex h-15 shrink-0 items-center justify-between">
		<div class="text-primary-foreground flex items-center space-x-8">
			<div class="font-logo text-3xl font-bold">
				<a href="/">SVMoney</a>
			</div>
			<nav>
				<menu class="flex items-center space-x-4">
					<li><a href="/dashboard">Dashboard</a></li>
					<li><a href="/account">Account</a></li>
					<li><a href="/transaction">Transaction</a></li>
					<li><a href="/summary">Summary</a></li>
					<li><a href="/showroom">Showroom</a></li>
				</menu>
			</nav>
		</div>
		<div class="flex items-center justify-between">
			<form method="POST" action="/?/logout">
				<button class="text-background">Logout</button>
			</form>
		</div>
	</div>
</header>
