exports.consolidateCartItems = (cartItems) => {
    const result = cartItems.reduce((acc, item) => {
      const existingItem = acc.find(i => i.product.barcode === item.product.barcode);
  
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }
  
      return acc;
    }, []);
  
    return result;
};
  