import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAuth, isSellerOrAdmin } from '../utils.js';

const productRouter = express.Router();

// sending products backend to frontend
productRouter.get(
	'/',
	expressAsyncHandler(async (req, res) => {
		const seller = req.query.seller || '';
		const sellerFilter = seller ? { seller } : {};
		const products = await Product.find({ ...sellerFilter }).populate(
			'seller',
			'seller.name seller.logo'
		);
		res.send(products);
	})
);

//creating products backend
productRouter.get(
	'/seed',
	expressAsyncHandler(async (req, res) => {
		const createdProducts = await Product.insertMany(data.products);
		res.send({ createdProducts });
	})
);

// sending productlist backend to frontend
productRouter.get(
	'/:id',
	expressAsyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id).populate(
			'seller',
			'seller.name seller.logo seller.rating seller.numReviews'
		);
		if (product) {
			res.send(product);
		} else {
			res.status(404).send({ message: 'Product Not Found' });
		}
	})
);

// to display product list
productRouter.post(
	'/',
	isAuth,
	isSellerOrAdmin,
	expressAsyncHandler(async (req, res) => {
		const product = new Product({
			name: 'sample name ' + Date.now(),
			seller: req.user._id,
			image: '/images/p1.jpg',
			price: 0,
			category: 'sample category',
			brand: 'sample brand',
			countInStock: 0,
			rating: 0,
			numReviews: 0,
			description: 'sample description',
		});
		const createdProduct = await product.save();
		res.send({ message: 'Product Created', product: createdProduct });
	})
);

//for updating product in product list
productRouter.put(
	'/:id',
	isAuth,
	isSellerOrAdmin,
	expressAsyncHandler(async (req, res) => {
		const productId = req.params.id;
		const product = await Product.findById(productId);
		if (product) {
			product.name = req.body.name;
			product.price = req.body.price;
			product.image = req.body.image;
			product.category = req.body.category;
			product.brand = req.body.brand;
			product.countInStock = req.body.countInStock;
			product.description = req.body.description;
			const updatedProduct = await product.save();
			res.send({ message: 'Product Updated', product: updatedProduct });
		} else {
			res.status(404).send({ message: 'Product Not Found' });
		}
	})
);
//to delete product in product
productRouter.delete(
	'/:id',
	isAuth,
	isSellerOrAdmin,
	expressAsyncHandler(async (req, res) => {
		const productId = req.params.id;
		const product = await Product.findById(productId);
		if (product) {
			const deleteProduct = await product.remove();
			res.send({ message: 'Product Deleted', product: deleteProduct });
		} else {
			res.status(404).send({ message: 'Product Not Found' });
		}
	})
);

export default productRouter;
