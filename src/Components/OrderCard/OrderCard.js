import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  withStyles,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import React, { useEffect, useState } from "react";
import classes from "./OrderCard.module.css";
import InputMask from "react-input-mask";
import { useSnackbar } from "notistack";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import CancelIcon from "@material-ui/icons/Cancel";
import "./OrderCard.css";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <InputMask
      {...other}
      mask="(\+\9\9\2)\ 99-999-99-99"
      maskChar=""
      type="text"
    />
  );
}

const GreenRadio = withStyles({
  root: {
    color: "rgba(0,0,0,.4)",
    "&$checked": {
      color: "#ff6600",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const GreenCheckbox = withStyles({
  root: {
    color: "#ff6600",
    "&$checked": {
      color: "#ff6600",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const OrderCard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const [FIO, setFIO] = useState("");
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState(false);
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [pasType, setPasType] = useState("Новый");
  const [cancelAppears, setCancelAppears] = useState([false, false, false]);
  const [files, setFiles] = useState([null, null, null]);
  const [state, setState] = useState([
    { file: "", imagePreviewUrl: "" },
    { file: "", imagePreviewUrl: "" },
    { file: "", imagePreviewUrl: "" },
  ]);
  const [reference, setReference] = useState(null);
  const [referenceUrl, setReferenceUrl] = useState({
    file: "",
    imagePreviewUrl: "",
  });
  const [referenceCancelAppears, setReferendeCancelAppears] = useState(false);

  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [finalize, setFinalize] = useState(false);
  const [done, setDone] = useState(false);

  const regular = `!@#$%^&*()_+-*/"№;%:?.<>,~'{}[]=|`;

  const numPhone = [
    "91",
    "40",
    "90",
    "88",
    "55",
    "00",
    "93",
    "50",
    "77",
    "70",
    "99",
    "11",
    "92",
  ];

  const [classnameSVG, setClassnameSVG] = useState("");

  useEffect(() => {
    changeFilesStatesAppears(pasType);
  }, [pasType]);

  const regularFn = (str) => {
    for (let i = 0; i < regular.length; i++) {
      if (str === regular[i]) {
        return true;
      }
    }
    return false;
  };
  const checkNumPhone = (number) => {
    for (let i = 0; i < numPhone.length; i++) {
      if (number.includes(numPhone[i])) {
        return true;
      }
    }
    return false;
  };
  const changeNameInp = (e) => {
    if (e.target.value.includes("  ")) {
      return;
    } else if (
      e.target.value[e.target.value.length - 1] === "0" ||
      Number(e.target.value[e.target.value.length - 1]) ||
      regularFn(e.target.value[e.target.value.length - 1]) ||
      regularFn(e.target.value)
    ) {
      return;
    } else if (e.target.value !== " ") {
      let newName = e.target.value.split(" ");
      if (newName.length <= 3) {
        setFIO(e.target.value);
      }
    }
  };
  const changePhone = (e) => {
    const n = e.target.value.slice(7);
    if (n.length > 1 && !checkNumPhone(n)) {
      return;
    }
    setPhone(e.target.value);
  };
  const changeOtp = (e) => {
    if (
      (e.target.value[e.target.value.length - 1] >= "0" &&
        e.target.value[e.target.value.length - 1] <= "9" &&
        e.target.value.length < 5) ||
      e.target.value.length == 0
    ) {
      setOtp(e.target.value);
    }
  };

  const handleImageChange = (e, id) => {
    e.preventDefault();
    setFiles((f) => changeArr(f, id, e.target.files[0]));
    let reader = new FileReader();
    let file = e.target.files[0];

    // console.log(file);

    reader.onloadend = () => {
      setState((f) =>
        f.map((elem, index) => {
          if (index == id) {
            return {
              file: file,
              imagePreviewUrl: reader.result,
            };
          }
          return elem;
        })
      );
    };
    if (file) {
      setTimeout(() => {
        e.target.value = null;
      }, 10);
      reader.readAsDataURL(file);
    } else {
      return;
    }
  };

  const handleReferenceImageChange = (e) => {
    e.preventDefault();
    setReference(e.target.files[0]);
    let reader = new FileReader();
    let file = e.target.files[0];

    // console.log(file);

    reader.onloadend = () => {
      setReferenceUrl({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    if (file) {
      setTimeout(() => {
        e.target.value = null;
      }, 10);
      reader.readAsDataURL(file);
    } else {
      return;
    }
  };

  const getOtp = async () => {
    try {
      setLoading(true);
      const fetchBody = {
        method: "POST",
        body: "phone=" + phone.split(" ")[1].split("-").join(""),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      // const response1
      const response = await fetch("http://192.168.100.13:8090/otp", fetchBody);
      console.log(1);
      if (!response.ok) {
        if (
          response.status == 400 &&
          (await response.json()).reason ==
            "В течение 5 минут было запрошенно много ОТП"
        ) {
          enqueueSnackbar(
            "Было отправлено много сообщений! Побробуйте через 5 минут!",
            {
              variant: "warning",
              anchorOrigin: { horizontal: "center", vertical: "top" },
            }
          );
        }
        setLoading(false);
        return;
      }
      const responseJson = await response.json();
      if (responseJson["reason"] == "success") {
        setStep1(true);
      }
      enqueueSnackbar("Сообщение отправлено!", {
        variant: "success",
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      enqueueSnackbar("Что-то пошло не так!", {
        variant: "error",
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
    }
  };

  const getToken = async () => {
    try {
      setLoading(true);
      const fetchBody = {
        method: "POST",
        body: JSON.stringify({
          code: "992",
          phone: phone.split(" ")[1].split("-").join(""),
          otp: otp,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        "http://192.168.100.13:8090/otp_check",
        fetchBody
      );
      if (!response.ok) {
        setLoading(false);
        enqueueSnackbar("Неправильный код!", {
          variant: "error",
          anchorOrigin: { horizontal: "center", vertical: "top" },
        });
        return;
      }
      const responseJson = await response.json();
      setToken(responseJson["ident_token"]);
      setStep2(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      enqueueSnackbar("Что-то пошло не так!", {
        variant: "error",
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
    }
  };

  const changeArr = (arr = [], index, value) => {
    return arr.map((elem, ind) => {
      if (ind == index) {
        return value;
      }
      return elem;
    });
  };

  const postAllCollectedData = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("fio", FIO);
      formData.append("product", "LAHZA_LANDING_PAGE");
      formData.append("files1", files[0]);
      formData.append("files2", files[1]);
      if (pasType == "Старый") {
        formData.append("files3", files[2]);
      }
      if (!!reference) {
        if (pasType == "Старый") {
          formData.append("files4", reference);
        }
        formData.append("files3", reference);
      }

      const postObj = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token,
        },
      };

      const response = await fetch(
        "http://192.168.100.13:8090/send_order",
        postObj
      );

      if (!response.ok) {
        setLoading(false);
        const responseJson = await response.json();
        if (
          response.status == 400 &&
          responseJson.reason ==
            "Сегодня по вашему номеру уже было принята заявки"
        ) {
          enqueueSnackbar("По вашему номеру уже была принята заявка!", {
            variant: "info",
            anchorOrigin: { horizontal: "center", vertical: "top" },
          });
          setStep1(false);
          setStep2(false);
          setStep3(false);
          setFinalize(false);
          setFiles([null, null, null]);
          setState([
            { file: "", imagePreviewUrl: "" },
            { file: "", imagePreviewUrl: "" },
            { file: "", imagePreviewUrl: "" },
          ]);
          setReference(null);
          setReferenceUrl({ file: "", imagePreviewUrl: "" });
          setFIO("");
          setPhone("");
          setOtp("");
          setToken("");
          setDone(false);
          return;
        }
        if (response.status == 400) {
          enqueueSnackbar(responseJson.mess, {
            variant: "error",
            anchorOrigin: { horizontal: "center", vertical: "top" },
          });
        }
        if (response.status == 500) {
          enqueueSnackbar("Что-то пошло не так!", {
            variant: "error",
            anchorOrigin: { horizontal: "center", vertical: "top" },
          });
        }
        return;
      }

      setDone(true);
      setFiles([null, null, null]);
      setState([
        { file: "", imagePreviewUrl: "" },
        { file: "", imagePreviewUrl: "" },
        { file: "", imagePreviewUrl: "" },
      ]);
      setReference(null);
      setReferenceUrl({ file: "", imagePreviewUrl: "" });
      setFIO("");
      setPhone("");
      setOtp("");
      setToken("");

      console.log(response);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getFileInputs = () => {
    const arr = pasType == "Новый" ? [0, 1] : [0, 1, 2];
    return arr.map((o, i) => (
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={4}
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        <div className={`${classes.inputFileContainer}`}>
          <input
            onMouseEnter={() => setCancelAppears((f) => changeArr(f, i, true))}
            onMouseLeave={() => setCancelAppears((f) => changeArr(f, i, false))}
            type="file"
            id="files"
            className={`${classes.fileInput}`}
            name="asd"
            onChange={(e) => handleImageChange(e, i)}
            accept="image/*"
            title="fasfsd"
          />
          <label for="files" className={`${classes.inputFileLabel}`}>
            <AddCircleTwoToneIcon style={{ fontSize: 80 }} />
          </label>
          {files[i] === null ? null : (
            <div className={`${classes.imagePreviewContainer}`}>
              <img
                src={state[i].imagePreviewUrl}
                className={`${classes.tokenImage}`}
                alt=""
              />
            </div>
          )}
          {files[i] === null ? null : cancelAppears[i] ? (
            <div
              onMouseLeave={() =>
                setCancelAppears((f) => changeArr(f, i, false))
              }
              onMouseEnter={() =>
                setCancelAppears((f) => changeArr(f, i, true))
              }
              className={`${classes.closeIcon}`}
            >
              <Button
                onClick={() => {
                  setFiles((f) => changeArr(f, i, null));
                  setState((f) =>
                    changeArr(f, i, { imagePreviewUrl: "", file: "" })
                  );
                }}
                style={{ borderRadius: "100%", width: 60, height: 60 }}
              >
                <CancelIcon style={{ fontSize: "30px" }} color="error" />
              </Button>
              {/* files[i] = null */}
            </div>
          ) : null}
        </div>
      </Grid>
    ));
  };

  const changeFilesStatesAppears = (string) => {
    setState([
      { file: "", imagePreviewUrl: "" },
      { file: "", imagePreviewUrl: "" },
      { file: "", imagePreviewUrl: "" },
    ]);
    setFiles([null, null, null]);
    setCancelAppears([false, false, false]);
  };

  const getImageCheck = () => {
    if (pasType == "Новый") {
      console.log(files[0], files[1]);
      return !!files[0] && !!files[1];
    } else {
      console.log(files[0] && files[1] && files[2]);
      return !!files[0] && !!files[1] && !!files[2];
    }
  };

  const getPasImagesForFinalize = () => {
    const arr = pasType == "Новый" ? [0, 1] : [0, 1, 2];
    return arr.map((elem, i) => (
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={4}
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        <div className={`${classes.inputFileContainer}`}>
          {files[i] === null ? null : (
            <div className={`${classes.imagePreviewContainer}`}>
              <img
                src={state[i].imagePreviewUrl}
                className={`${classes.tokenImage}`}
                alt=""
              />
            </div>
          )}
        </div>
      </Grid>
    ));
  };

  return (
    <div id="OrderCard">
      {/* {console.log(cancelAppears)}
        {console.log(state)}
        {console.log(files)} */}
      {/* {console.log(pasType)} */}
      <Grid container justify="center">
        {!done ? (
          <Grid
            item
            xs={12}
            md={
              (step1 && step2 && !step3) ||
              (step1 && step2 && step3) ||
              (step1 && step2 && step3 && finalize)
                ? 10
                : 8
            }
            style={{
              backgroundColor: "rgb(62, 71, 87)",
              borderTopRightRadius: "8px",
              borderTopLeftRadius: "8px",
            }}
          >
            <p
              style={{
                fontSize: "20px",
                width: "100%",
                textAlign: "center",
                color: "white",
              }}
            >
              {!step1 &&
                !step2 &&
                !step3 &&
                !finalize &&
                "Заполните информацию"}
              {step1 &&
                !step2 &&
                !step3 &&
                !finalize &&
                "Введите код подтверждения"}
              {step1 && step2 && !step3 && !finalize && "Загрузите фотографии"}
              {step1 &&
                step2 &&
                step3 &&
                !finalize &&
                "Приложите справку о заработной плате"}
              {step1 && step2 && step3 && finalize && "Завершение оформления"}
            </p>
          </Grid>
        ) : null}
        {!step1 && !step2 && !step3 && !finalize && !done ? (
          <Grid
            item
            xs={12}
            md={8}
            style={{
              backgroundColor: "#fff",
              borderBottomLeftRadius: "6px",
              borderBottomRightRadius: "6px",
              padding: "30px 15px 30px 15px",
              border: "1px solid rgba(0,0,0,.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  maxWidth: "650px",
                }}
                id="outlined-basic"
                label="Фамилия, имя и отчество*"
                variant="outlined"
                value={FIO}
                onChange={changeNameInp}
              />
              <TextField
                InputProps={{ inputComponent: TextMaskCustom }}
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  maxWidth: "650px",
                }}
                id="outlined-basic"
                label="Номер телефона*"
                variant="outlined"
                value={phone}
                onChange={changePhone}
              />
            </div>
            <hr style={{ border: "1px solid rgba(0,0,0,.15)" }} />
            <Grid
              container
              style={{
                width: "100%",
                maxWidth: "650px",
                padding: "25px 30px 5px 30px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xs={12}
                md={6}
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                <FormControlLabel
                  value="end"
                  control={<GreenCheckbox color="secondary" />}
                  label="Принимаю все условия, согласен быть терпилой"
                  labelPlacement="end"
                  checked={checked}
                  onClick={() => setChecked(!checked)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                <Button
                  onClick={getOtp}
                  variant="contained"
                  size="large"
                  color="primary"
                  style={{
                    padding: "20px",
                    width: "200px",
                    backgroundColor:
                      FIO && phone.length > 18 && checked
                        ? "#ff6600"
                        : "#f5f5f5",
                    minHeight: "66px",
                  }}
                  disabled={FIO && phone.length > 18 && checked ? false : true}
                >
                  {loading ? (
                    <CircularProgress size="15px" color="#ffffff" />
                  ) : (
                    "Оформить"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
        {step1 && !step2 && !step3 ? (
          <Grid
            item
            xs={12}
            md={8}
            style={{
              backgroundColor: "#fff",
              borderBottomLeftRadius: "6px",
              borderBottomRightRadius: "6px",
              padding: "30px 15px 15px 15px",
              border: "1px solid rgba(0,0,0,.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  maxWidth: "650px",
                }}
                id="outlined-basic"
                label="Код подтверждения*"
                variant="outlined"
                value={otp}
                onChange={changeOtp}
              />
            </div>
            <Grid
              item
              xs={12}
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              <Button
                onClick={getToken}
                variant="contained"
                size="large"
                color="primary"
                style={{
                  padding: "20px",
                  width: "200px",
                  backgroundColor: otp.length == 4 ? "#ff6600" : "#f5f5f5",
                  minHeight: "66px",
                }}
                disabled={otp.length != 4}
              >
                {loading ? (
                  <CircularProgress size="15px" color="#ffffff" />
                ) : (
                  "Отправить код"
                )}
              </Button>
              <p onClick={getOtp} className={`${classes.resendImage}`}>
                Отправить смс-код ещё раз?
              </p>
            </Grid>
          </Grid>
        ) : null}
        {step1 && step2 && !step3 && !finalize && !done ? (
          <Grid
            item
            container
            xs={12}
            md={10}
            spacing={2}
            style={{
              backgroundColor: "#fff",
              borderBottomLeftRadius: "6px",
              borderBottomRightRadius: "6px",
              padding: "30px 15px 30px 15px",
              border: "1px solid rgba(0,0,0,.15)",
            }}
          >
            <Grid item xs={12}>
              <FormLabel
                component="legend"
                style={{ fontSize: "20px", fontWeight: "500" }}
              >
                Выберите тип паспорта
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={pasType}
                row
                onChange={(e) => {
                  setPasType((f) => e.target.value);
                  console.log(e.target.value);
                }}
              >
                <FormControlLabel
                  value="Новый"
                  control={<GreenRadio />}
                  color="primary"
                  label="Новый"
                />
                <FormControlLabel
                  value="Старый"
                  control={<GreenRadio />}
                  label="Старый"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "rgba(0,0,0,.54)",
                }}
              >
                Необходимо приложить :
              </p>
              {pasType == "Старый" ? (
                <>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "400",
                      color: "rgba(0,0,0,.54)",
                    }}
                  >
                    &ndash; Первая страница пасспорта*
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "400",
                      color: "rgba(0,0,0,.54)",
                    }}
                  >
                    &ndash; Прописка*
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "400",
                      color: "rgba(0,0,0,.54)",
                    }}
                  >
                    &ndash; ННН*
                  </p>
                </>
              ) : (
                <>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "400",
                      color: "rgba(0,0,0,.54)",
                    }}
                  >
                    &ndash; Лицевая сторона паспорта*
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "400",
                      color: "rgba(0,0,0,.54)",
                    }}
                  >
                    &ndash; Обратная сторона паспорта*
                  </p>
                </>
              )}
            </Grid>
            {getFileInputs()}
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  setStep3(true);
                }}
                variant="contained"
                size="large"
                color="primary"
                style={{
                  padding: "20px",
                  width: "200px",
                  backgroundColor: getImageCheck() ? "#ff6600" : "#f5f5f5",
                  minHeight: "66px",
                }}
                disabled={!getImageCheck()}
              >
                {loading ? (
                  <CircularProgress size="15px" color="#ffffff" />
                ) : (
                  "Далее"
                )}
              </Button>
            </Grid>
          </Grid>
        ) : null}
        {step1 && step2 && step3 && !finalize && !done ? (
          <Grid
            item
            container
            xs={12}
            md={10}
            spacing={2}
            style={{
              backgroundColor: "#fff",
              borderBottomLeftRadius: "6px",
              borderBottomRightRadius: "6px",
              padding: "30px 15px 30px 15px",
              border: "1px solid rgba(0,0,0,.15)",
            }}
          >
            <Grid item xs={12}>
              <Grid item xs={12}>
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "rgba(0,0,0,.54)",
                  }}
                >
                  Необходимо приложить :
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    color: "rgba(0,0,0,.54)",
                  }}
                >
                  &ndash; Справка о заработной плате с места работы
                  (необязательно)
                </p>
                <Grid
                  item
                  container
                  xs={12}
                  sm={12}
                  md={4}
                  style={{ paddingTop: "20px", paddingBottom: "20px" }}
                >
                  <div className={`${classes.inputFileContainer}`}>
                    <input
                      onMouseEnter={() => setReferendeCancelAppears(true)}
                      onMouseLeave={() => setReferendeCancelAppears(false)}
                      type="file"
                      id="files"
                      className={`${classes.fileInput}`}
                      name="asd"
                      onChange={(e) => handleReferenceImageChange(e)}
                      accept="image/*"
                      title="fasfsd"
                    />
                    <label for="files" className={`${classes.inputFileLabel}`}>
                      <AddCircleTwoToneIcon style={{ fontSize: 80 }} />
                    </label>
                    {reference === null ? null : (
                      <div className={`${classes.imagePreviewContainer}`}>
                        <img
                          src={referenceUrl.imagePreviewUrl}
                          className={`${classes.tokenImage}`}
                          alt=""
                        />
                      </div>
                    )}
                    {reference === null ? null : referenceCancelAppears ? (
                      <div
                        onMouseLeave={() => setReferendeCancelAppears(false)}
                        onMouseEnter={() => setReferendeCancelAppears(true)}
                        className={`${classes.closeIcon}`}
                      >
                        <Button
                          onClick={() => {
                            setReference(null);
                            setReferenceUrl({ file: "", imagePreviewUrl: "" });
                          }}
                          style={{
                            borderRadius: "100%",
                            width: 60,
                            height: 60,
                          }}
                        >
                          <CancelIcon
                            style={{ fontSize: "30px" }}
                            color="error"
                          />
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  onClick={() => {
                    setFinalize(true);
                  }}
                  variant="contained"
                  size="large"
                  color="primary"
                  style={{
                    padding: "20px",
                    backgroundColor: "#ff6600",
                    minHeight: "66px",
                  }}
                >
                  {loading ? (
                    <CircularProgress size="15px" color="#ffffff" />
                  ) : (
                    "Завершение оформления"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
        {step1 && step2 && step3 && finalize && !done ? (
          <Grid
            item
            container
            xs={12}
            md={10}
            spacing={2}
            style={{
              backgroundColor: "#fff",
              borderBottomLeftRadius: "6px",
              borderBottomRightRadius: "6px",
              padding: "30px 15px 30px 15px",
              border: "1px solid rgba(0,0,0,.15)",
            }}
          >
            <Grid item xs={12}>
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  color: "rgba(0,0,0,.54)",
                }}
              >
                Проверьте данные ещё раз
              </p>
            </Grid>
            <Grid item xs={12}>
              <p className={`${classes.finalizeParagraphs}`}>ФИО : {FIO}</p>
              <p className={`${classes.finalizeParagraphs}`}>
                Номер телефона : {phone}
              </p>
              <p className={`${classes.finalizeParagraphs}`}>
                Справка о заработной плате: &nbsp;
                {!!reference ? (
                  <Grid
                    item
                    container
                    xs={12}
                    sm={12}
                    md={4}
                    style={{ paddingTop: "20px", paddingBottom: "20px" }}
                  >
                    <div className={`${classes.inputFileContainer}`}>
                      {reference === null ? (
                        "Не приложено"
                      ) : (
                        <div className={`${classes.imagePreviewContainer}`}>
                          <img
                            src={referenceUrl.imagePreviewUrl}
                            className={`${classes.tokenImage}`}
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                  </Grid>
                ) : (
                  "Не приложено"
                )}
              </p>
              <p className={`${classes.finalizeParagraphs}`}>
                Данные паспорта :
                <Grid container spacing={2}>
                  {getPasImagesForFinalize()}
                </Grid>
              </p>
            </Grid>
            <Grid
              item
              xs={12}
              container
              justify="center"
              direction="column"
              alignItems="center"
            >
              <Button
                onClick={() => {
                  postAllCollectedData();
                }}
                variant="contained"
                size="large"
                color="primary"
                style={{
                  padding: "20px",
                  backgroundColor: "#ff6600",
                  minHeight: "66px",
                  width: "200px",
                }}
              >
                {loading ? (
                  <CircularProgress size="15px" color="#ffffff" />
                ) : (
                  "Оформить"
                )}
              </Button>
              <p
                className={`${classes.doItAgainMazafaka}`}
                onClick={() => {
                  setStep1(false);
                  setStep2(false);
                  setStep3(false);
                  setFinalize(false);
                  setFiles([null, null, null]);
                  setState([
                    { file: "", imagePreviewUrl: "" },
                    { file: "", imagePreviewUrl: "" },
                    { file: "", imagePreviewUrl: "" },
                  ]);
                  setReference(null);
                  setReferenceUrl({ file: "", imagePreviewUrl: "" });
                  setFIO("");
                  setPhone("");
                  setOtp("");
                  setToken("");
                  setDone(false);
                }}
              >
                Начать заново
              </p>
            </Grid>
          </Grid>
        ) : null}
        {step1 && step2 && step3 && finalize && done ? (
          <Grid
            item
            container
            xs={12}
            md={8}
            spacing={2}
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
              borderBottomLeftRadius: "6px",
              borderBottomRightRadius: "6px",
              padding: "30px 15px 30px 15px",
              border: "1px solid rgba(0,0,0,.15)",
            }}
          >
            <div class="containerSvg">
              <svg
                viewbox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                class="animate svgItem"
              >
                <path
                  class="pathItem"
                  d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z"
                  stroke="#3da35a"
                  fill="transparent"
                />
              </svg>
            </div>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <span
                style={{
                  color: "rgba(0,0,0,.54)",
                  fontSize: "30px",
                  fontWeight: "500",
                }}
              >
                Ваша заявка принята!
              </span>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

export default OrderCard;
