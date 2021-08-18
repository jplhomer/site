import {
  useCart,
  useCartLinesTotalQuantity,
  Money,
  CartToggle,
  CartCheckoutButton,
  Link,
  CartLines,
  CartLine,
  CartShopPayButton,
} from '@shopify/hydrogen/client';

export default function Cart() {
  const itemCount = useCartLinesTotalQuantity();
  const {error} = useCart();

  return (
    <div className="overflow-hidden md:h-auto pointer-events-auto">
      <div className="flex flex-col shadow-xl max-h-full">
        <header className="bg-white px-4 md:px-8 md:h-20 border-b border-gray-300 border-solid rounded-t-md flex flex-shrink-0 items-center justify-between">
          <CartHeader />
        </header>

        <div className="bg-white px-4 md:px-8 overflow-y-scroll md:max-h-96">
          {itemCount > 0 ? (
            <CartLineItems />
          ) : (
            <p className="text-center text-gray-600 my-8">Your cart is empty</p>
          )}
        </div>

        {error ? (
          <div
            className="border bg-red-200 border-red-400 text-red-800 mb-4 mx-8 px-4 py-3 rounded relative"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        <footer
          className={`${
            itemCount > 0 ? 'border-t border-solid border-gray-300' : ''
          } bg-white p-4 md:p-8 space-y-4 flex-shrink-0 rounded-b-md`}
        >
          {itemCount > 0 ? <CartFooter /> : null}
        </footer>
      </div>
    </div>
  );
}

export function CartIcon() {
  const itemCount = useCartLinesTotalQuantity();

  return (
    <div className="relative">
      <svg
        width="19"
        height="24"
        viewBox="0 0 19 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5894 7H3.41063C2.89451 7 2.46318 7.39279 2.415 7.90666L1.205 20.8133C1.09502 21.9865 2.01796 23 3.19627 23H15.8037C16.982 23 17.905 21.9865 17.795 20.8133L16.585 7.90666C16.5368 7.39279 16.1055 7 15.5894 7Z"
          stroke="#1F2937"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M6 7V9.98952C6 12.0075 7.63589 13.6434 9.65386 13.6434V13.6434C11.6718 13.6434 13.3077 12.0075 13.3077 9.98952V7"
          stroke="#1F2937"
          strokeWidth="2"
        />
        <path
          d="M13 6L13 4.5C13 2.567 11.433 1 9.5 1V1C7.567 1 6 2.567 6 4.5L6 6"
          stroke="#1F2937"
          strokeWidth="2"
          className={`${itemCount > 0 ? 'block' : 'hidden'}`}
        />
      </svg>

      <div
        className={`bg-blue-600 text-xs rounded-full leading-none text-white absolute bottom-0 right-0 flex items-center justify-center transform translate-y-1/2 transition-all ${
          itemCount > 0 ? 'h-4 w-4' : 'h-0 w-0 overflow-hidden'
        }`}
      >
        {itemCount > 0 ? itemCount : null}
      </div>
      <span className="sr-only">Cart, {itemCount} items</span>
    </div>
  );
}

function CartHeader() {
  return (
    <>
      <CartToggle>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="sr-only">Close cart</span>
      </CartToggle>
      <div className="h-12 w-12 p-2 md:h-7 md:w-7 md:p-0">
        <CartIcon />
      </div>
    </>
  );
}

function CartLineItems() {
  return (
    <div role="table" aria-label="Shopping cart">
      <div role="row" className="sr-only">
        <div role="columnheader">Image</div>
        <div role="columnheader">Item details</div>
        <div role="columnheader">Price</div>
      </div>
      <CartLines>
        {({merchandise}) => (
          <div
            role="row"
            className="pt-8 pb-8 border-b border-solid border-gray-300 last:border-0"
          >
            <div className="flex space-x-8 relative">
              <div role="cell">
                <div className="w-20 h-20 relative">
                  <Link to={`/products/${merchandise.product.handle}`}>
                    <CartLine.Image className="bg-white rounded w-full h-full object-cover" />
                  </Link>
                </div>
              </div>
              <div
                role="cell"
                className="flex-grow flex flex-col justify-between"
              >
                <div className="flex gap-2">
                  <div className="flex-grow">
                    <CartLine.ProductTitle className="text-gray-900 font-semibold" />
                    <CartLine.SelectedOptions className="text-sm">
                      {({name, value}) => (
                        <>
                          {name}: {value}
                        </>
                      )}
                    </CartLine.SelectedOptions>
                    <CartLine.Attributes className="text-sm">
                      {({key, value}) => (
                        <>
                          {key}: {value}
                        </>
                      )}
                    </CartLine.Attributes>
                  </div>
                  <div className="flex-shrink">
                    <CartLine.QuantityAdjustButton
                      adjust="remove"
                      aria-label="Remove from cart"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </CartLine.QuantityAdjustButton>
                  </div>
                </div>
                <div className="flex mt-2">
                  <div className="flex-grow">
                    <div className="border border-solid border-gray-300 inline-flex items-center text-gray-500 rounded">
                      <CartLine.QuantityAdjustButton
                        adjust="decrease"
                        className="p-2"
                        aria-label="Decrease quantity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </CartLine.QuantityAdjustButton>
                      <CartLine.Quantity
                        as="div"
                        className="p-2 text-gray-900 text-center"
                      />
                      <CartLine.QuantityAdjustButton
                        adjust="increase"
                        className="p-2"
                        aria-label="Increase quantity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </CartLine.QuantityAdjustButton>
                    </div>
                  </div>
                </div>
                <CartLine.Price
                  role="cell"
                  className="absolute bottom-0 right-0 mb-3"
                />
              </div>
            </div>
          </div>
        )}
      </CartLines>
    </div>
  );
}

function CartFooter() {
  const {subtotal} = useCart();

  return (
    <>
      <div role="table" className="w-full" aria-label="Cost summary">
        {subtotal && (
          <div role="row" className="flex items-center justify-between">
            <div role="rowheader" className="pb-2 font-semibold">
              Subtotal
            </div>
            <div role="cell" className="text-right pb-2">
              <Money money={subtotal} />
            </div>
          </div>
        )}
        <div role="row" className="flex items-center justify-between">
          <div role="rowheader" className="font-semibold">
            Shipping
          </div>
          <div role="cell" className="text-right">
            Free
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <CartShopPayButton className="flex justify-center w-full" />
        <CartCheckoutButton className="block w-full text-white uppercase text-sm rounded-md md:mb-8 bg-black px-3 py-4 disabled:cursor-wait disabled:opacity-60">
          Checkout
        </CartCheckoutButton>
      </div>
    </>
  );
}
