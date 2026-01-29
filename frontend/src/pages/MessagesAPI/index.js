import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { i18n } from "../../translate/i18n";
import { Button, CircularProgress, Grid, TextField, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import toastError from "../../errors/toastError";
import { toast } from "react-toastify";
// import api from "../../services/api";
import axios from "axios";
import usePlans from "../../hooks/usePlans";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    flex: 1,
    padding: theme.spacing(2),
    paddingBottom: 100
  },
  mainHeader: {
    marginTop: theme.spacing(1),
  },
  elementMargin: {
    padding: theme.spacing(2),
  },
  formContainer: {
    maxWidth: 500,
  },
  textRight: {
    textAlign: "right"
  }
}));

const MessagesAPI = () => {
  const classes = useStyles();
  const history = useHistory();

  const [formMessageTextData,] = useState({ token: '', number: '', body: '', isGroup: false })
  const [formMessageMediaData,] = useState({ token: '', number: '', medias: '', isGroup: false })
  const [file, setFile] = useState({})

  const { getPlanCompany } = usePlans();

  useEffect(() => {
    async function fetchData() {
      const companyId = localStorage.getItem("companyId");
      const planConfigs = await getPlanCompany(undefined, companyId);
      if (!planConfigs.plan.useExternalApi) {
        toast.error("¡Esta compañía no tiene permiso para acceder a esta página!Te estamos redirigiendo.");
        setTimeout(() => {
          history.push(`/`)
        }, 1000);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEndpoint = () => {
    return process.env.REACT_APP_BACKEND_URL + '/api/messages/send'
  }

  const handleSendTextMessage = async (values) => {
    const { number, body, isGroup } = values;
    const data = { number, body, isGroup };
    try {
      await axios.request({
        url: getEndpoint(),
        method: 'POST',
        data,
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${values.token}`
        }
      })
      toast.success('Publicación exitosa');
    } catch (err) {
      toastError(err);
    }
  }

  const handleSendMediaMessage = async (values) => {
    try {
      const firstFile = file[0];
      const data = new FormData();
      data.append('number', values.number);
      data.append('body', firstFile.name);
      data.append('isGroup', values.isGroup);
      data.append('medias', firstFile);
      await axios.request({
        url: getEndpoint(),
        method: 'POST',
        data,
        headers: {
          'Content-type': 'multipart/form-data',
          'Authorization': `Bearer ${values.token}`
        }
      })
      toast.success('Publicación exitosa');
    } catch (err) {
      toastError(err);
    }
  }

  const renderFormMessageText = () => {
    return (
      <Formik
        initialValues={formMessageTextData}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          setTimeout(async () => {
            await handleSendTextMessage(values);
            actions.setSubmitting(false);
            actions.resetForm()
          }, 400);
        }}
        className={classes.elementMargin}
      >
        {({ isSubmitting }) => (
          <Form className={classes.formContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  label={i18n.t("messagesAPI.textMessage.token")}
                  name="token"
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  className={classes.textField}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  label={i18n.t("messagesAPI.textMessage.number")}
                  name="number"
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  className={classes.textField}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label={i18n.t("messagesAPI.textMessage.body")}
                  name="body"
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  className={classes.textField}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Field name="isGroup">
                  {({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value || false}
                          onChange={field.onChange}
                          name={field.name}
                        />
                      }
                      label="Enviar a grupo"
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} className={classes.textRight}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.btnWrapper}
                >
                  {isSubmitting ? (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  ) : 'Enviar'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    )
  }

  const renderFormMessageMedia = () => {
    return (
      <Formik
        initialValues={formMessageMediaData}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          setTimeout(async () => {
            await handleSendMediaMessage(values);
            actions.setSubmitting(false);
            actions.resetForm()
            document.getElementById('medias').files = null
            document.getElementById('medias').value = null
          }, 400);
        }}
        className={classes.elementMargin}
      >
        {({ isSubmitting }) => (
          <Form className={classes.formContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  label={i18n.t("messagesAPI.mediaMessage.token")}
                  name="token"
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  className={classes.textField}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  label={i18n.t("messagesAPI.mediaMessage.number")}
                  name="number"
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  className={classes.textField}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <input type="file" name="medias" id="medias" required onChange={(e) => setFile(e.target.files)} />
              </Grid>
              <Grid item xs={12}>
                <Field name="isGroup">
                  {({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value || false}
                          onChange={field.onChange}
                          name={field.name}
                        />
                      }
                      label="Enviar a grupo"
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} className={classes.textRight}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.btnWrapper}
                >
                  {isSubmitting ? (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  ) : 'Enviar'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    )
  }

  return (
    <Paper
      className={classes.mainPaper}
      style={{marginLeft: "5px"}}
      // className={classes.elementMargin}
      variant="outlined"
    >
      <Typography variant="h5">
        Documentación para enviar mensajes
      </Typography>
      <Typography variant="h6" color="primary" className={classes.elementMargin}>
        Métodos de Envio
      </Typography>
      <Typography component="div">
        <ol>
          <li>Mensajes de texto</li>
          <li>Mensajes de medios</li>
        </ol>
      </Typography>
      <Typography variant="h6" color="primary" className={classes.elementMargin}>
        Instrucciones
      </Typography>
      <Typography className={classes.elementMargin} component="div">
        <b>Observaciones importantes</b><br />
        <ul>
          <li>Antes de enviar mensajes, debe registrar el token vinculado a la conexión que enviará los mensajes. <br />Para hacer el registro, vaya al menú "Conexiones", haga clic en el botón Editar desde la conexión e ingrese el token en el campo adecuado.</li>
          <li>
            Para <b>contactos individuales</b>, el número de envío no debe tener una máscara o caracteres especiales y debe estar compuesto por:
            <ul>
              <li>Código del país</li>
              <li>DDD</li>
              <li>Número</li>
            </ul>
            Ejemplo: 5599999999999
          </li>
          <li>
            Para <b>grupos</b>, marque la casilla "Enviar a grupo" y proporcione el ID del grupo (solo números, sin @g.us).
            <br />El ID del grupo generalmente es un número largo que puede obtenerse de la URL del grupo o mediante la API de WhatsApp.
            <br />Ejemplo: 120363123456789012@g.us (solo ingrese: 120363123456789012)
          </li>
        </ul>
      </Typography>
      <Typography variant="h6" color="primary" className={classes.elementMargin}>
        1. Mensajes de texto
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.elementMargin} component="div">
            <p>A continuación se muestran la lista de información requerida para enviar mensajes de texto:</p>
            <b>Endpoint: </b> {getEndpoint()} <br />
            <b>Método: </b> POST <br />
            <b>Headers: </b> Authorization (Bearer token) e Content-Type (application/json) <br />
            <b>Body (contacto individual): </b> {"{ \"number\": \"5599999999999\", \"body\": \"mensaje\" }"} <br />
            <b>Body (grupo): </b> {"{ \"number\": \"120363123456789012\", \"body\": \"mensaje\", \"isGroup\": true }"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.elementMargin}>
            <b>Prueba de envío</b>
          </Typography>
          {renderFormMessageText()}
        </Grid>
      </Grid>
      <Typography variant="h6" color="primary" className={classes.elementMargin}>
        2. Mensajes de medios
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.elementMargin} component="div">
            <p>A continuación se muestran la lista de información requerida para enviar mensajes de medios:</p>
            <b>Endpoint: </b> {getEndpoint()} <br />
            <b>Método: </b> POST <br />
            <b>Headers: </b> Authorization (Bearer token) e Content-Type (multipart/form-data) <br />
            <b>FormData (contacto individual): </b> <br />
            <ul>
              <li>
                <b>number: </b> 5599999999999
              </li>
              <li>
                <b>body: </b> descripción del archivo (opcional)
              </li>
              <li>
                <b>medias: </b> archivo
              </li>
            </ul>
            <b>FormData (grupo): </b> <br />
            <ul>
              <li>
                <b>number: </b> 120363123456789012
              </li>
              <li>
                <b>body: </b> descripción del archivo (opcional)
              </li>
              <li>
                <b>isGroup: </b> true
              </li>
              <li>
                <b>medias: </b> archivo
              </li>
            </ul>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.elementMargin}>
            <b>Prueba de envío</b>
          </Typography>
          {renderFormMessageMedia()}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MessagesAPI;
