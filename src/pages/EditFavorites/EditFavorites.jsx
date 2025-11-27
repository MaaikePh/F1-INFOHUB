import './EditFavorites.css';
import {useForm} from 'react-hook-form';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import {useNavigate} from 'react-router-dom';
import Select from '../../components/auth-components/Select/Select.jsx';
import Button from '../../components/general/Button/Button.jsx';
import {normalize} from '../../helpers/normalizer.js';
import driverstats from '../../constants/driver-stats.json';

function EditFavorites() {
    const [selectedTeam, setSelectedTeam] = useState('');

    const {favoriteTeam, favoriteDriver, updateFavorites, loading}  = useContext(AuthContext);

    const teams = [
        ...new Map(driverstats.map(d => [d.team.key, d.team]))
    ].map(([, team]) => team);

    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        defaultValues: {
            favoriteTeam,
            favoriteDriver
        }
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (favoriteTeam) {
            setValue('favoriteTeam', favoriteTeam);
            setSelectedTeam(favoriteTeam);
        }
    }, [favoriteTeam, setValue]);

    function handleTeamChange(e) {
        const newTeam = e.target.value;
        setSelectedTeam(newTeam);
        setValue('favoriteTeam', newTeam);
        setValue('favoriteDriver', '');
    }

    const teamOptions = teams.map(team => ({
        value: team.key,
        label: team.name
    }))

    const driverOptions = driverstats
        .filter(driver => normalize(driver.team.key) === normalize(selectedTeam))
        .map(driver => ({
            value: driver.name,
            label: driver.name
        }));

    async function onSubmit(data) {
        const teamName = teams.find(t => t.key === data.favoriteTeam)?.name;

        await updateFavorites({
            favoriteTeam: teamName,
            favoriteDriver: data.favoriteDriver
        });
        navigate('/dashboard');
    }

    return (
        <div className='edit-favorites-container'>
            <h1 className='title'>Favorieten aanpassen</h1>

            <form
                className='edit-favorites-form'
                onSubmit={handleSubmit(onSubmit)}
            >

                <Select
                    selectId='favoriteTeam'
                    selectName='favoriteTeam'
                    selectLabel='Kies een nieuw favoriet team'
                    validationRules={{
                        required: {
                            value: true,
                            message: 'Selecteer een team.'
                        },
                    }}
                    selectOptions={teamOptions}
                    register={register}
                    onChange={handleTeamChange}
                    errors={errors.favoriteTeam?.message}
                />

                <Select
                    selectId="favoriteDriver"
                    selectName="favoriteDriver"
                    selectLabel="Kies een nieuwe favoriete coureur"
                    validationRules={{
                        required: {
                            value: true,
                            message: "Selecteer een coureur."
                        }
                    }}
                    selectOptions={driverOptions}
                    register={register}
                    disabled={!selectedTeam}
                    errors={errors.favoriteDriver?.message}
                />

                <Button
                    type='submit'
                    buttonStyle='primary'
                    showArrow={!loading}
                    disabled={loading}
                >
                    {loading ? 'Bezig...' : 'Opslaan'}
                </Button>

            </form>

        </div>
    )
}

export default EditFavorites;