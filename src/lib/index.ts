// place files you want to import through the `$lib` alias in this folder.

export interface ApiRequest extends ApiRequestDynamicFields {
	page?: number;
	after?: number;
	size?: number;
	sort?: string;
	select?: string;
	highlight?: string;
	sampling?: string;
	format?: string;
	html?: boolean;
	q?: string;
	q_mode?: string;
	q_fields?: string;
	qs?: string;
	bbox?: string;
	xyz?: string;
	geo_distance?: string;
}

// Générer les clés dynamiques avec les suffixes _eq, _lte et _gte
type DynamicKeys<K extends keyof Result, T> = T extends number | Date
	? `${K}_eq` | `${K}_lte` | `${K}_gte` | `${K}_lt` | `${K}_gt`
	: T extends string | boolean
		? `${K}_eq`
		: never;

// Créer un type qui génère les clés dynamiques en parcourant les propriétés de l'interface Result
type ApiRequestDynamicFields = {
	[K in keyof Result as DynamicKeys<K, Result[K]>]?: Result[K] extends Date ? string : Result[K];
};

export interface ApiResponse {
	total: number;
	next: string;
	results: Result[];
}

export interface Result {
	Conso_chauffage_dépensier_é_finale: number;
	'Volume_stockage_générateur_ECS_n°1'?: number;
	Conso_é_finale_installation_ECS?: number;
	'Nom__commune_(BAN)': string;
	Emission_GES_chauffage: number;
	'Conso_ECS_é_finale_énergie_n°2': number;
	'Conso_ECS_é_finale_énergie_n°1': number;
	Besoin_refroidissement?: string;
	'Conso_chauffage_dépensier_installation_chauffage_n°1'?: number;
	Coût_total_5_usages: number;
	'Configuration_installation_chauffage_n°1'?: ConfigurationInstallationChauffageN1;
	Conso_é_finale_dépensier_installation_ECS?: number;
	Configuration_installation_ECS?: ConfigurationInstallationECS;
	'Type_installation_chauffage_n°1'?: string;
	'Surface_chauffée_installation_chauffage_n°1'?: number;
	'Coordonnée_cartographique_X_(BAN)': number;
	Nombre_niveau_logement: number;
	Apports_internes_saison_froid?: number;
	'Type_installation_ECS_(général)': TypeInstallation;
	Déperditions_murs?: number;
	'Conso_5_usages_par_m²_é_primaire': number;
	Coût_refroidissement: number;
	'Ubat_W/m²_K': number;
	'Date_installation_générateur_ECS_n°1'?: string;
	'Usage_générateur_ECS_n°1'?: UsageGénérateurN1;
	Coût_ECS_dépensier: number;
	Position_logement_dans_immeuble?: string;
	Emission_GES_auxiliaires: number;
	Année_construction?: number;
	'Emission_GES_5_usages_par_m²': number;
	Emission_GES_éclairage: number;
	Apports_solaires_saison_froid?: number;
	Conso_ECS_dépensier_é_finale: number;
	'N°_DPE_remplacé'?: string;
	'Adresse_(BAN)': string;
	Date_visite_diagnostiqueur: Date;
	Surface_ventilée?: number;
	'Type_énergie_générateur_ECS_n°1'?: TypeÉnergie;
	'Présence_production_PV_(0/1)'?: boolean;
	Coût_ECS: number;
	Nombre_niveau_immeuble?: number;
	Surface_habitable_desservie_par_installation_ECS?: number;
	Surface_habitable_immeuble?: number;
	"Complément_d'adresse_logement"?: string;
	Coût_éclairage: number;
	Date_établissement_DPE: Date;
	'Coût_total_5_usages_énergie_n°2': number;
	'Type_générateur_ECS_n°1'?: string;
	'Coût_total_5_usages_énergie_n°1': number;
	'Description_installation_chauffage_n°1'?: string;
	'N°_voie_(BAN)'?: string;
	Besoin_ECS?: string;
	'N°DPE': string;
	Conso_refroidissement_é_finale: number;
	Conso_chauffage_é_primaire: number;
	'Appartement_non_visité_(0/1)'?: boolean;
	Adresse_brute: string;
	Conso_éclairage_é_primaire: number;
	Qualité_isolation_menuiseries: QualitéIsolationEnveloppeEnum;
	Qualité_isolation_murs: QualitéIsolationMursEnum;
	'Emission_GES_5_usages_énergie_n°1': number;
	'Type_émetteur_installation_chauffage_n°1'?: string;
	'Emission_GES_5_usages_énergie_n°2': number;
	Statut_géocodage: StatutGéocodage;
	'Emission_GES_ECS_énergie_n°2': number;
	Classe_inertie_bâtiment?: string;
	'Emission_GES_ECS_énergie_n°1': number;
	Nombre_appartement: number;
	Modèle_DPE: ModèleDPE;
	'Description_générateur_chauffage_n°1_installation_n°1'?: string;
	'Production_électricité_PV_(kWhep/an)': number;
	Conso_5_usages_é_finale: number;
	Nombre_logements_desservis_par_installation_ECS?: number;
	'N°_département_(BAN)': string;
	Conso_refroidissement_é_primaire: number;
	Méthode_application_DPE: string;
	'N°_région_(BAN)': string;
	Surface_habitable_logement: number;
	'Code_postal_(brut)': string;
	Deperditions_planchers_bas?: number;
	'Coordonnée_cartographique_Y_(BAN)': number;
	_rand: number;
	Période_construction: string;
	Emission_GES_ECS_dépensier: number;
	'Emission_GES_chauffage_énergie_n°2': number;
	'Emission_GES_chauffage_énergie_n°1': number;
	'Conso_é_finale_dépensier_générateur_ECS_n°1'?: number;
	Emission_GES_refroidissement: number;
	Classe_altitude?: ClasseAltitude;
	Description_installation_ECS?: string;
	Emission_GES_ECS: number;
	'Type_énergie_n°1': TypeÉnergie;
	'Type_énergie_n°2': TypeÉnergie;
	'Coût_ECS_énergie_n°2': number;
	'Ventilation_postérieure_2012_(0/1)'?: boolean;
	Date_réception_DPE: Date;
	'Coût_ECS_énergie_n°1': number;
	Type_installation_ECS?: string;
	Conso_ECS_é_finale: number;
	Emission_GES_5_usages: number;
	'Code_postal_(BAN)': string;
	Conso_éclairage_é_finale: number;
	Coût_refroidissement_dépensier: number;
	Date_fin_validité_DPE: Date;
	Deperditions_planchers_hauts?: number;
	Typologie_logement?: string;
	Emission_GES_refroidissement_dépensier: number;
	Type_bâtiment: TypeBâtiment;
	Apports_solaires_saison_chauffe?: number;
	'Conso_chauffage_générateur_n°1_installation_n°1'?: number;
	Coût_chauffage: number;
	Déperditions_renouvellement_air?: number;
	Déperditions_portes?: number;
	_geopoint: string;
	'Conso_chauffage_installation_chauffage_n°1'?: number;
	Conso_ECS_dépensier_é_primaire: number;
	Zone_climatique_?: string;
	Type_ventilation?: string;
	Conso_refroidissement_dépensier_é_finale: number;
	'Usage_générateur_n°1_installation_n°1'?: UsageGénérateurN1;
	Version_DPE: number;
	Deperditions_baies_vitrées?: number;
	'Conso_chauffage_dépensier_générateur_n°1_installation_n°1'?: number;
	'Type_énergie_générateur_n°1_installation_n°1'?: TypeÉnergie;
	Déperditions_ponts_thermiques?: number;
	Type_installation_chauffage: TypeInstallation;
	Type_énergie_principale_chauffage?: TypeÉnergie;
	Qualité_isolation_enveloppe: QualitéIsolationEnveloppeEnum;
	Système_production_électricité_origine_renouvelable?: SystèmeProductionÉlectricitéOrigineRenouvelable;
	Emission_GES_chauffage_dépensier: number;
	Besoin_chauffage?: number;
	Conso_ECS_é_primaire: number;
	Etiquette_GES: string;
	'Conso_5_usages_é_finale_énergie_n°1': number;
	'Conso_5_usages_é_finale_énergie_n°2': number;
	Conso_auxiliaires_é_primaire: number;
	Conso_auxiliaires_é_finale: number;
	'Conso_é_finale_générateur_ECS_n°1'?: number;
	Conso_chauffage_é_finale: number;
	Coût_chauffage_dépensier: number;
	Etiquette_DPE: Note;
	Conso_refroidissement_dépensier_é_primaire: number;
	Besoin_refroidissement_dépensier?: number;
	'Type_générateur_n°1_installation_n°1'?: string;
	'N°_DPE_immeuble_associé'?: string;
	'Coût_chauffage_énergie_n°1': number;
	_i: number;
	'Coût_chauffage_énergie_n°2': number;
	Qualité_isolation_plancher_bas: QualitéIsolationEnveloppeEnum;
	Apports_internes_saison_chauffe_?: number;
	'Conso_5_usages/m²_é_finale': number;
	'Hauteur_sous-plafond': number;
	Identifiant__BAN: string;
	Coût_auxiliaires: number;
	'Nom__rue_(BAN)': string;
	Conso_chauffage_dépensier_é_primaire: number;
	'Code_INSEE_(BAN)': string;
	Score_BAN: number;
	Deperditions_enveloppe?: number;
	Type_énergie_principale_ECS?: TypeÉnergie;
	Conso_5_usages_é_primaire: number;
	'Conso_chauffage_é_finale_énergie_n°2': number;
	'Conso_chauffage_é_finale_énergie_n°1': number;
	_score: null;
	_id: string;
	Catégorie_ENR?: string;
	'N°_étage_appartement'?: number;
	'Logement_traversant_(0/1)'?: boolean;
	'Description_générateur_ECS_n°1'?: string;
	Indicateur_confort_été?: string;
	'Présence_brasseur_air_(0/1)'?: boolean;
	Qualité_isolation_plancher_haut_comble_perdu?: QualitéIsolationMursEnum;
	'Protection_solaire_exterieure_(0/1)'?: boolean;
	Surface_totale_capteurs_photovoltaïque?: number;
	'Inertie_lourde_(0/1)'?: boolean;
	'Isolation_toiture_(0/1)'?: boolean;
	"Complément_d'adresse_bâtiment"?: string;
	Nombre_module?: number;
	'Conso_ECS_é_finale_énergie_n°3'?: number;
	'Conso_chauffage_générateur_n°2_installation_n°1'?: number;
	'Coût_total_5_usages_énergie_n°3'?: number;
	'Conso_chauffage_dépensier_générateur_n°2_installation_n°1'?: number;
	'Emission_GES_5_usages_énergie_n°3'?: number;
	'Emission_GES_ECS_énergie_n°3'?: number;
	'Emission_GES_chauffage_énergie_n°3'?: number;
	'Type_énergie_n°3'?: TypeÉnergie;
	'Coût_ECS_énergie_n°3'?: number;
	'Description_générateur_chauffage_n°2_installation_n°1'?: string;
	Electricité_PV_autoconsommée?: number;
	'Type_générateur_n°2_installation_n°1'?: string;
	'Conso_5_usages_é_finale_énergie_n°3'?: number;
	'Usage_générateur_n°2_installation_n°1'?: UsageGénérateurN1;
	'Type_énergie_générateur_n°2_installation_n°1'?: TypeÉnergie;
	'Coût_chauffage_énergie_n°3'?: number;
	'Conso_chauffage_é_finale_énergie_n°3'?: number;
	Nom_résidence?: string;
	Facteur_couverture_solaire?: number;
	Type_installation_solaire?: string;
}

export enum ClasseAltitude {
	InférieurÀ400M = 'inférieur à 400m'
}

export enum ConfigurationInstallationECS {
	UnSeulSystèmeDECSAvecSolaire = "Un seul système d'ECS avec solaire",
	UnSeulSystèmeDECSSansSolaire = "Un seul système d'ECS sans solaire"
}

export enum ConfigurationInstallationChauffageN1 {
	InstallationDeChauffageAvecInsertOuPoêleBoisEnAppoint = 'Installation de chauffage avec insert ou poêle bois en appoint',
	InstallationDeChauffageSimple = 'Installation de chauffage simple'
}

export enum ModèleDPE {
	DPE3CL2021MéthodeLogement = 'DPE 3CL 2021 méthode logement'
}

export enum QualitéIsolationEnveloppeEnum {
	Bonne = 'bonne',
	Insuffisante = 'insuffisante',
	Moyenne = 'moyenne',
	TrèsBonne = 'très bonne'
}

export enum QualitéIsolationMursEnum {
	Insuffisante = 'insuffisante',
	TrèsBonne = 'très bonne'
}

export enum StatutGéocodage {
	AdresseGéocodéeBanÀLAdresse = "adresse géocodée ban à l'adresse",
	AdresseNonGéocodéeBanCarAucuneCorrespondanceTrouvée = 'adresse non géocodée ban car aucune correspondance trouvée'
}

export enum SystèmeProductionÉlectricitéOrigineRenouvelable {
	SolairePhotovoltaïque = 'Solaire Photovoltaïque'
}

export enum TypeBâtiment {
	Appartement = 'appartement'
}

export enum TypeInstallation {
	Collectif = 'collectif',
	Individuel = 'individuel',
	MixteCollectifIndividuel = 'mixte (collectif-individuel)'
}

export enum TypeÉnergie {
	BoisBûches = 'Bois – Bûches',
	GazNaturel = 'Gaz naturel',
	RéseauDeChauffageUrbain = 'Réseau de Chauffage urbain',
	Électricité = 'Électricité'
}

export enum UsageGénérateurN1 {
	Chauffage = 'chauffage',
	ChauffageEcs = 'chauffage + ecs',
	Ecs = 'ecs'
}

export type Note = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
