import React from 'react';
import ProblematicNodes from '../components/Problematic/ProblematicNodes';
import ProblematicPods from '../components/Problematic/ProblematicPods';
import { Grid } from '@mui/material';

const ProblematicContainer = () => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={6}>
				<ProblematicNodes />
			</Grid>
			<Grid item xs={6}>
				<ProblematicPods />
			</Grid>
		</Grid>
	);
};

export default ProblematicContainer;
