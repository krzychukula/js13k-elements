!function e(r,n,o){function t(u,f){if(!n[u]){if(!r[u]){var l="function"==typeof require&&require;if(!f&&l)return l(u,!0);if(i)return i(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var c=n[u]={exports:{}};r[u][0].call(c.exports,function(e){var n=r[u][1][e];return t(n?n:e)},c,c.exports,e,r,n,o)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)t(o[u]);return t}({1:[function(){console.log("hello js13 games"),console.log("hello again");var e=document.getElementById("game"),r=e.getContext("2d");r.rect(5,5,50,50),r.fill()},{}]},{},[1]);