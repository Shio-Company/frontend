import { GoogleLogin } from '@react-oauth/google';

/**
 * Botão customizado de Login do Google usando o componente nativo.
 * @param {object} props
 * @param {(credential: string) => void} props.onSuccess - Callback com o ID token (credential) do Google.
 * @param {() => void} props.onError - Callback para erros de login.
 */
export const GoogleLoginButton = ({ onSuccess, onError }) => {
  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (onSuccess) onSuccess(credentialResponse.credential);
        }}
        onError={(error) => {
          console.error('Login Failed', error);
          if (onError) onError();
        }}
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
      />
    </div>
  );
};