// eslint-disable-next-line prettier/prettier

/*
call: que é responsável por chamar a api externa, onde passamos a referência da
função get de dentro da constante api, e passamos os parâmetros por ,. É uma
forma estranha de fazer mas é assim que tem que ser.



put: Que é responsável por executar uma função, para chamar o reducer.

all: É um agrupador de sagas, igual ao combineReducers do Redux

takeLatest: é uma função que executa na última requisição do usuário, se o
usuário clicar três vezes no adicionar carrinho e action for disparada três
vezes, as duas primeiras serão canceladas, apenas a última que vai continuar,
isso é uma maneira excelente para lidar com duplicidade de requisição.

utilizamos o select para buscar o estado atual do reducer passando uma função e verificando se estive um produto
conforme o id do produto que estamos adicionando.
*/

import { toast } from 'react-toastify';

import { call, select, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';
import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  // Eu chamo a rota stock passando o id do produto, e armazeno na variável stock
  const stock = yield call(api.get, `/stock/${id}`);

  // Criei a variável stockAmout para guardar a quantidade do estoque.
  const stockAmount = stock.data.amount;

  /* Criei a variável currentAmount para pegar o valor da quantidade de produto
  atual que já está no carrinho.
  */
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));

    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);

  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
