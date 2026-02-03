import React from 'react'
import style from './Cartao.module.css'
import { loadMercadoPago } from '@mercadopago/sdk-js'
import { useNavigate } from 'react-router-dom';
import FormEndereco from '../FormEndereco/FormEndereco';

const Cartao = ({link, carrinho, total, setCarrinho, infoEntrega }) => {
    const [load, setLoad] = React.useState(false)
    const navigate = useNavigate();
    
    React.useEffect(()=>{    
        const inicializacaoCardForm = async () =>{      
        await loadMercadoPago();
        const mp = new window.MercadoPago("TEST-b168936b-b786-4cef-8f16-570baf4a9249");  
        const tokenUser = localStorage.token

        const cardForm = mp.cardForm({
            amount: `${total}`,
            iframe: true,
            form: {
            id: `form-checkout`,
            cardNumber: {
                id: "form-checkout__cardNumber",
                placeholder: "Número do cartão",
            },
            expirationDate: {
                id: "form-checkout__expirationDate",
                placeholder: "MM/YY",
            },
            securityCode: {
                id: "form-checkout__securityCode",
                placeholder: "Código de segurança",
            },
            cardholderName: {
                id: "form-checkout__cardholderName",
                placeholder: "Titular do cartão",
            },
            issuer: {
                id: "form-checkout__issuer",
                placeholder: "Banco emissor",
            },
            installments: {
                id: "form-checkout__installments",
                placeholder: "Parcelas",
            },        
            identificationType: {
                id: "form-checkout__identificationType",
                placeholder: "Tipo de documento",
            },
            identificationNumber: {
                id: "form-checkout__identificationNumber",
                placeholder: "Número do documento",
            },
            cardholderEmail: {
                id: "form-checkout__cardholderEmail",
                placeholder: "E-mail",
            },
            },
            callbacks: {
            onFormMounted: error => {
                if (error) return console.warn("Form Mounted handling error: ", error);
                console.log("Form mounted");
            },
            onSubmit: event => {
                setLoad(true)
                event.preventDefault();

                const {
                    paymentMethodId: payment_method_id,
                    issuerId: issuer_id,
                    cardholderEmail: email,
                    amount,
                    token,
                    installments,
                    identificationNumber,
                    identificationType,
                } = cardForm.getCardFormData();

                fetch(link + '/api/loja/pagamento/cartao', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    issuer_id,
                    payment_method_id,
                    transaction_amount: Number(amount),
                    installments: Number(installments),
                    description: "Descrição do produto",
                    payer: {
                        email,
                        identification: {
                            type: identificationType,
                            number: identificationNumber,
                        },
                    },
                    carrinho,
                    tokenUser,
                    infoEntrega
                }),                
                }).then(x => x.json()).then(x => {
                    
                    if(x.status) {
                        localStorage.removeItem('carrinho');
                        setCarrinho([])
                        navigate('/meus-pedidos')
                    }
                    setLoad(false)
                    console.log(x)

                })
            },
            onFetching: (resource) => {
                console.log("Fetching resource: ", resource);
    
                // Animate progress bar
                const progressBar = document.querySelector(".progress-bar");
                progressBar.removeAttribute("value");
                

                return () => {
                progressBar.setAttribute("value", "0");
                };
            }
            },
        });
    }
    inicializacaoCardForm() 
        
  },[]);
  
    return (
        <>
            {load && <div className={style.loading}></div>}
            <div className={style.div_pai}>
                        
                <form id="form-checkout">
                    <div className={style.info_pessoal}>
                        {/* <FormEndereco setInfoEntrega={setInfoEntrega} infoEntrega={infoEntrega} tipo={tipo} setTipo={setTipo}/> */}

                        <h5 className={style.titulo}>Detalhes do cliente</h5>

                        <div className={style.tipo_de_documento}>
                            <select id="form-checkout__identificationType"></select>
                            <input type="text" id="form-checkout__identificationNumber" /> 
                        </div>
                        <input type="email" id="form-checkout__cardholderEmail" className={style.input_email}/>

                    </div>

                    <div className={style.detalhes_cartao}>
                        <h5 className={style.titulo}>Detalhes do cartão</h5>

                        <input type="text" id="form-checkout__cardholderName" className={style.titular_cartao}/>

                        <div className={style.numero_codigo_cartao}>
                            <div id="form-checkout__cardNumber" className={style.inputContainer}></div>
                            <div id="form-checkout__securityCode" className={style.inputContainer}></div>
                        </div>


                        <div className={style.mes_banco_parcelas}>
                            <div id="form-checkout__expirationDate" className={style.inputContainer}></div>
                            <select id="form-checkout__issuer" defaultValue=""></select>
                            <select id="form-checkout__installments" defaultValue=""></select>
                        </div>
                    </div>
                    <progress value="0" className={`progress-bar ${style.progress}`}>Carregando...</progress>
                    {/* <button type="submit" id="form-checkout__submit">Pagar</button> */}
                </form>
            </div>
        </>
    )
}

export default Cartao