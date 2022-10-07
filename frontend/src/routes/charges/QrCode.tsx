import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { doRequest } from '../../helpers/api';

const ChargeQrCode = () => {
  const [charge, setCharge] = useState('');
  const [error, setError] = useState(false);
  const [qrcode, setQrcode] = useState('');
  const [qrcodeImage, setQrcodeImage] = useState('');
  const [buttonText, setButtonText] = useState('Copiar');

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await doRequest(
        'GET',
        `/charges/qrcode/${charge}`,
        true
      );
      const data = await response.json();

      setQrcode(data.Qrcode);
      setQrcodeImage(data.ImagemQrcode);
      console.log({ data });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(qrcode);
    setButtonText('Copiado');
  };

  return (
    <Layout title="Gerar Qrcode">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Código da cobrança
            </label>
            <input
              type="text"
              value={charge}
              onChange={(e) => setCharge(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="d-flex flex-row-reverse mb-3">
            <div className="p-1">
              <button className="btn btn-primary" disabled={qrcode !== ''}>Gerar</button>
            </div>
            <div className="p-1">
              <a
                onClick={() => navigate('/home')}
                className="btn btn-secondary"
              >
                Voltar
              </a>
            </div>
          </div>
        </form>
        {qrcode !== '' && (
          <>
            <div>
              <img
                src={qrcodeImage}
                className="img-fluid mx-auto d-block border"
                alt="qrcode"
              />
            </div>
            <div>
              <div className="input-group mt-3">
                <input
                  type="text"
                  value={qrcode}
                  className="form-control"
                  placeholder=""
                  disabled
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon1"
                  onClick={handleCopy}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ChargeQrCode;
