import { Product } from "../types.ts";

let products: Array<Product> = [
	{
		id: "1",
		name: "Product one",
		description: "this is product one",
		price: 29.99,
	},
	{
		id: "2",
		name: "Product two",
		description: "This is product two",
		price: 49.99,
	},
	{
		id: "3",
		name: "Product one",
		description: "This is product three",
		price: 59.99,
	},
];

// @desc	Get all products
// @route	GET /api/v1/products
const getProducts = ({ response }: { response: any }) => {
	response.body = {
		success: true,
		data: products,
	};
};

// @desc	Get a product
// @route	GET /api/v1/products/:id
const getProduct = ({
	params,
	response,
}: {
	params: { id: string };
	response: any;
}) => {
	const product: Product | undefined = products.find(
		(product) => product.id === params.id
	);

	if (!product) {
		response.status = 404;
		response.body = {
			success: false,
			msg: "No product found",
		};
	}

	response.status = 200;
	response.body = {
		success: true,
		data: product,
	};
};

// @desc	Add a product
// @route	POST /api/v1/products
const addProduct = async ({
	request,
	response,
}: {
	request: any;
	response: any;
}) => {
	const body = request.body();

	if (!request.hasBody) {
		response.status = 400;
		response.body = {
			success: false,
			msg: "No data sent",
		};

		return;
	}
	const bodyValue = await body.value;

	const product: Product = {
		id: crypto.randomUUID(),
		...bodyValue,
	};

	products.push(product);

	response.status = 201;
	response.body = {
		success: true,
		data: product,
	};
};

// @desc	Update a product
// @route	PUT /api/v1/products
const updateProduct = async ({
	params,
	request,
	response,
}: {
	params: { id: string };
	request: any;
	response: any;
}) => {
	const product: Product | undefined = products.find(
		(product) => product.id === params.id
	);

	if (!product) {
		response.status = 404;
		response.body = {
			success: false,
			msg: "No product found",
		};

		return;
	}

	const update: Omit<Product, "id"> = await request.body().value;

	const updatedProduct: Product = { ...product, ...update };

	products = products.map((p) => (p.id !== params.id ? p : updatedProduct));

	response.status = 200;
	response.body = {
		success: true,
		data: updatedProduct,
	};
};

// @desc	Delete a product
// @route	DELETE /api/v1/products
const deleteProduct = ({
	params,
	response,
}: {
	params: { id: string };
	response: any;
}) => {
	products = products.filter((p) => p.id !== params.id);

	response.status = 200;
	response.body = {
		success: true,
		msg: "Deleted successfully",
	};
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
