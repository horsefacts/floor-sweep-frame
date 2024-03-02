# 🧹 floor-sweep-frame

A Farcaster frames example app using transaction actions.

Post a link with an OpenSea collection slug to render a "floor sweep" frame. For example:

`https://floor-sweep-frame.vercel.app/collection/farcaster-protocol-release-4`

The frame will the OpenSea API to find the cheapest available listing in the collection and construct a Seaport "basic order" transaction to purchase it. Collections must be on Base.
