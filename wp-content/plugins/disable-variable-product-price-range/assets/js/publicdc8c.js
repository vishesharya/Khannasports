(function ($) {

    // Receiving object
    wdvpprPublicObject = wdvppr_public_object;

    var singleVariation, priceContainer, initPrice, prevPrice, wdvpprPublicObject, product_wrapper, priceType;

    if (wdvpprPublicObject.priceType !== "") { priceType = wdvpprPublicObject.priceType; } else { priceType = 'default'; }

    if (wdvpprPublicObject.wrapperClass !== "") {
        product_wrapper = '.product.product-type-variable, ' + wdvpprPublicObject.wrapperClass;
    }
    else {
        product_wrapper = '.product.product-type-variable';
    }

    // Triggering the `show_variation` event
    $(product_wrapper).on("show_variation", function (event, variation) {
        // Getting variation price
        if (!variation) {
            console.info('WDVPPR Info: Variation data not found!');
        }
        else {
            // Getting variation price
            variationPrice = variation.price_html;
            initPrice = variation.wdvppr_init_price;
            // Checking price_html is Empty string, undefined, null or not
            if (variation.price_html) {
                // Passing variation price to the function
                $(document.body).trigger('wdvppr_show_variation_price', [variation, variationPrice, $(this), initPrice, 'show_variation']);
                hideDefaultPrice();
            } else {

            }
        }
    });

    // Triggering `hide_variation` event
    $(product_wrapper).on("hide_variation", function (event, variation) {
        // changePrice(initPrice, $(this));
        $(document.body).trigger('wdvppr_show_variation_price', [variation, initPrice, $(this), initPrice, 'hide_variation']);
    });
    1
    // Init the wdvppr_show_variation_price trigger
    $(document.body).on("wdvppr_show_variation_price", function (event, variation, price, variation_wrapper, init_Price, display_variation) {
        changePrice(variation, price, variation_wrapper, init_Price, display_variation);
    });

    // Function to run- on changing the variation dropdown
    function changePrice(variation, variationPrice, priceContainer, init_Price, display_variation) {

        var priceContainer2;

        if (wdvpprPublicObject.changeVariationPrice === "") return;

        if (prevPrice === variationPrice) return;

        if (priceType == 'list_all_variation') {
            if (display_variation == 'show_variation') {
                jQuery('.wdvppr-list-variation li').hide();
                jQuery('.wdvppr-list-variation li.wdvppr-variation-' + variation.variation_id).show();
            } else {
                jQuery('.wdvppr-list-variation li').show();
            }
        } else {
            if (wdvpprPublicObject.removePriceClass !== "") {
                priceContainer2 = priceContainer.find('.price')
                    .not('.related .price, .upsell .price')
                    .not(wdvpprPublicObject.removePriceClass);
            }
            else {
                priceContainer2 = priceContainer.find('.price')
                    .not('.related .price, .upsell .price');
            }

            priceContainer2.fadeOut(200, function () {
                priceContainer2.html(variationPrice).fadeIn(200);
                prevPrice = variationPrice;
            });

            $(document).trigger('wdvppr_after_price_changed', priceContainer);
        }

    }

    // Default price hiding function
    function hideDefaultPrice() {
        // Default Price hiding condition
        switch (wdvpprPublicObject.hideDefaultPrice) {
            case 'on':
                $(product_wrapper).find('.single_variation_wrap .woocommerce-variation-price').addClass('wdvppr-hide-default-price');
                break;
            default:
                $(product_wrapper).find('.single_variation_wrap .woocommerce-variation-price').removeClass('wdvppr-hide-default-price');
        }
    }

})(jQuery);