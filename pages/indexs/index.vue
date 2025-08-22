<template>
	<view class="">
		<uv-button text="登录" @click="handleLogin"></uv-button>
		<uv-button text="退出登录" @click="handleLogOut"></uv-button>
	</view>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const handleLogin = async () => {
	await userStore.handleLogin();
	console.log(userStore.isLogin);
};
const handleLogOut = async () => {
	await userStore.logOut();
	console.log(userStore.isLogin);
};
</script>

<style></style>
