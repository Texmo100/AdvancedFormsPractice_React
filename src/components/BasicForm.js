import useInput from "../hooks/use-input";

const isNotEmpty = value => value.trim() !== '';
const isEmail = value => value.includes('@');

const BasicForm = props => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    reset: resetFirstName
  } = useInput(isNotEmpty);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    reset: resetLastName
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmail
  } = useInput(isEmail);

  let formIsValid = false;
  let fullNameIsValid = firstNameIsValid && lastNameIsValid;

  if(fullNameIsValid && emailIsValid){
    formIsValid = true;
  }

  const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
  const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  const submitHandler = event => {
    event.preventDefault();

    if(!formIsValid){
      return;
    }

    console.log({firstNameValue, lastNameValue, emailValue});
    resetFirstName();
    resetLastName();
    resetEmail();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            id='firstName'
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameInputBlurHandler}
          />
          {
            firstNameHasError && <p className="error-text">Please enter a first name</p>
          }
        </div>

        <div className={lastNameClasses}>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            id='lastName'
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameInputBlurHandler}
          />
          {
            lastNameHasError && <p className="error-text">Please enter a last name</p>
          }
        </div>

      </div>

      <div className={emailClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          type='email'
          id='email'
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {
          emailHasError && <p className="error-text">Please enter a valid emial address</p>
        }
      </div>

      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;