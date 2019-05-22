export default (ctx, inject) => {
  const dialog = {
    alert: () => {
      alert('test');
    }
  };
  ctx.$dilog = dialog;
  inject('dialog', dialog);
};
