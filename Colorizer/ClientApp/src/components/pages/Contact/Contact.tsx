
import React, { useContext, useState } from 'react'
import { AppContext } from '../../core/contexts/app-context/appContext';
import { Button, Grid, NativeSelect, TextField, Typography } from '@material-ui/core';
import { createStyles, withStyles, Theme, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { Report } from '../../models/report.model';
import { ReportsApiService } from '../../../services/reports.api.service';
import { useHistory } from 'react-router';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    root2: {
        maxWidth: '450px',
        textAlign: 'center',
        margin: '100px auto',
        backgroundColor: 'white',
        border: '1px solid black'
    },
    button: {
        marginBottom: '10px'
    }
  }),
);

const initialValues = {
    title: '',
    description: '',
}


export default function Contact() {
    const { appState } = useContext(AppContext);
    const { user } = appState;
    const history = useHistory();
    const classes = useStyles();
    const [values, setValues] = useState(initialValues);
    const [type, setType] = React.useState('');
    const reportService = new ReportsApiService();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setType(event.target.value as string);
    };

    const handleSubmit = async () => {
        const report: Report = {
            reportType: type,
            title: values.title,
            description: values.description,
            email: user.email,
        }
        await reportService.submitReport(report);
        history.replace("/")
    }


    return (
        <div>
            {renderElements(values, classes, type, handleChange, handleSelectChange, handleSubmit)}
        </div>
    )
}


const renderElements = (values, classes, type, handleChange, handleSelectChange, handleSubmit) => {
    return (
        <div className={classes.root2}>
            <Grid container justify='space-around' direction='row' className={classes.margin}>
                <Grid item xs={10} className={classes.margin}>
                <Typography color='primary'>Report Type</Typography>
                <NativeSelect
                    className={classes.margin}
                    id="demo-customized-select-native"
                    value={type}
                    onChange={handleSelectChange}
                    input={<BootstrapInput />}
                >
                    <option aria-label="None" value="" />
                    <option value={'Account'}>Account Related</option>
                    <option value={'Suggestion'}>Suggestion</option>
                    <option value={'Problem'}>Application Problem</option>
                </NativeSelect>
                </Grid>
                <Grid item xs={10} className={classes.margin}>
                    <TextField
                        variant='outlined'
                        fullWidth
                        name="title"
                        id="title"
                        label="Title"
                        value={values.title}
                        onChange={handleChange}

                    />
                </Grid>
                <Grid item xs={10} className={classes.margin}>
                    <TextField
                        variant='outlined'
                        fullWidth
                        rows={6}
                        name="description"
                        id="description"
                        label="Description"
                        value={values.description}
                        onChange={handleChange}
                        multiline={true}

                    />
                </Grid>
            </Grid>
            <Button
            onClick={() =>handleSubmit()}
            background-color='primary'
            variant='contained'
            className={classes.button}
            >
                Submit Report
            </Button>
        </div>
    )
}