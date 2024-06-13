<template>
    <div class="flex flex-col flex-1">
        <div class="w-full flex flex-col px-4">
            <h2 class="mb-4">Games</h2>
            <LiveMatches />
        </div>
        <div class="w-full flex flex-col px-4 my-8">
            <h2 class="mb-4">Upcoming Games</h2>
            <UpcomingMatches/>
        </div>
        <div class="w-full flex flex-col px-4">
            <h2 class="mb-4">Top Scorers</h2>
            <TopScorers/>
        </div>
    </div>
</template>