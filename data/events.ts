import type { HistoricalEvent } from "@/types/history";

const firstPunicEvents: HistoricalEvent[] = [
  { id: "e264", year: -264, title: "Rome crosses to Sicily", summary: "Roman intervention at Messana expands into open war with Carthage.", certainty: "attested", battleSlug: "messana" },
  { id: "e263", year: -263, title: "Syracuse changes sides", summary: "Hiero II reaches terms with Rome, strengthening Roman logistics in Sicily.", certainty: "attested" },
  { id: "e262", year: -262, title: "Agrigentum invested", summary: "Roman armies begin the war’s first great siege.", certainty: "attested", battleSlug: "agrigentum" },
  { id: "e261", year: -261, title: "Agrigentum falls", summary: "Rome captures Akragas after defeating a Carthaginian relief force.", certainty: "attested", battleSlug: "agrigentum" },
  { id: "e260", year: -260, title: "A naval power emerges", summary: "Duilius wins Rome’s first major sea victory at Mylae.", certainty: "attested", battleSlug: "mylae" },
  { id: "e259", year: -259, title: "War widens", summary: "Operations extend toward Sardinia and Corsica; surviving accounts are fragmentary.", certainty: "probable" },
  { id: "e258", year: -258, title: "Fighting near Sulci", summary: "A Roman fleet wins a poorly documented encounter off Sardinia.", certainty: "disputed", battleSlug: "sulci" },
  { id: "e257", year: -257, title: "Clash at Tyndaris", summary: "A sudden engagement off northern Sicily ends without decisive strategic change.", certainty: "probable", battleSlug: "tyndaris" },
  { id: "e256", year: -256, title: "The war crosses to Africa", summary: "Victory at Ecnomus enables a Roman landing near Aspis.", certainty: "attested", battleSlug: "cape-ecnomus" },
  { id: "e255", year: -255, title: "Regulus defeated", summary: "After success at Adys, the Roman expedition is destroyed on the Bagradas plain.", certainty: "attested", battleSlug: "bagradas" },
  { id: "e254", year: -254, title: "Panormus captured", summary: "Roman forces take the major north-Sicilian port.", certainty: "attested" },
  { id: "e253", year: -253, title: "Costly maritime campaigning", summary: "Roman operations on the African coast are followed by another destructive storm.", certainty: "probable" },
  { id: "e252", year: -252, title: "Pressure on western Sicily", summary: "Roman advances narrow the Carthaginian position in Sicily.", certainty: "probable" },
  { id: "e251", year: -251, title: "War of positions", summary: "Both sides maneuver around the remaining Carthaginian strongholds.", certainty: "probable" },
  { id: "e250", year: -250, title: "Panormus and Lilybaeum", summary: "Rome wins at Panormus and begins the long siege of Lilybaeum.", certainty: "attested", battleSlug: "panormus" },
  { id: "e249", year: -249, title: "Disaster at Drepana", summary: "Adherbal defeats a Roman fleet attempting a surprise attack.", certainty: "attested", battleSlug: "drepana" },
  { id: "e248", year: -248, title: "The siege continues", summary: "Lilybaeum remains supplied by sea despite Roman pressure.", certainty: "attested", battleSlug: "lilybaeum" },
  { id: "e247", year: -247, title: "Hamilcar takes command", summary: "Hamilcar Barca begins operations from the heights near Panormus.", certainty: "attested" },
  { id: "e246", year: -246, title: "Stalemate in western Sicily", summary: "Raids and positional warfare replace large set-piece battles.", certainty: "probable" },
  { id: "e245", year: -245, title: "Mount Eryx contested", summary: "Carthaginian and Roman forces struggle over positions commanding Drepana.", certainty: "probable" },
  { id: "e244", year: -244, title: "A war of endurance", summary: "Neither side can force a decision around the western ports.", certainty: "probable" },
  { id: "e243", year: -243, title: "Rome finances a new fleet", summary: "Private contributions support construction of a renewed Roman navy.", certainty: "attested" },
  { id: "e242", year: -242, title: "Blockade tightens", summary: "The new Roman fleet drills and restricts Carthaginian access to western Sicily.", certainty: "probable" },
  { id: "e241", year: -241, title: "Victory at the Aegates", summary: "Rome defeats the relief fleet; peace ends the First Punic War.", certainty: "attested", battleSlug: "aegates" },
];

// Every year between the wars carries its own entry: the decades after 241 are
// where the second war was made, and a blank "year in focus" told the reader
// nothing was happening when a great deal was.
const interbellumEvents: HistoricalEvent[] = [
  { id: "e240", year: -240, title: "The Mercenary War", summary: "Carthage’s unpaid mercenaries and Libyan subjects revolt in a brutal war fought for survival at home.", certainty: "attested", war: "interbellum" },
  { id: "e239", year: -239, title: "Revolt spreads through Libya", summary: "Utica and Hippacra join the rebels. Carthage is besieged in its own hinterland and Hamilcar is recalled to command.", certainty: "attested", war: "interbellum" },
  { id: "e238", year: -238, title: "Rome seizes Sardinia", summary: "The mercenary garrison of Sardinia offers the island to Rome, which takes it and raises the indemnity when Carthage protests.", certainty: "attested", war: "interbellum" },
  { id: "e237", year: -237, title: "The Barcids enter Iberia", summary: "With the revolt crushed, Hamilcar Barca crosses to Iberia to build a Carthaginian power base beyond Roman reach.", certainty: "attested", war: "interbellum" },
  { id: "e236", year: -236, title: "Hamilcar campaigns in the south", summary: "Operations from Gades bring the Turdetani and the silver of the Guadalquivir under Carthaginian control.", certainty: "probable", war: "interbellum" },
  { id: "e235", year: -235, title: "Rome closes the temple of Janus", summary: "For the first time in living memory Rome is formally at peace, while Carthaginian power grows in Iberia.", certainty: "probable", war: "interbellum" },
  { id: "e234", year: -234, title: "Silver and soldiers", summary: "Iberian mines pay the indemnity to Rome and fund an army recruited and trained in Spain rather than hired abroad.", certainty: "probable", war: "interbellum" },
  { id: "e233", year: -233, title: "Rome fights the Sardinians", summary: "Roman consuls campaign against resistance in Sardinia and against Ligurian communities in the north.", certainty: "probable", war: "interbellum" },
  { id: "e232", year: -232, title: "Land for the landless", summary: "Rome distributes territory taken from the Gauls in the Ager Gallicus, hardening Cisalpine hostility.", certainty: "probable", war: "interbellum" },
  { id: "e231", year: -231, title: "Roman envoys in Spain", summary: "Rome reportedly sends an embassy to Hamilcar, who answers that he makes war on Iberians to pay Roman debts.", certainty: "disputed", war: "interbellum" },
  { id: "e230", year: -230, title: "Illyrian piracy", summary: "Attacks on Italian shipping in the Adriatic draw Roman attention east for the first time.", certainty: "probable", war: "interbellum" },
  { id: "e229", year: -229, title: "Hasdrubal succeeds Hamilcar", summary: "Hamilcar dies on campaign. His son-in-law Hasdrubal takes command, founds New Carthage, and rules by diplomacy as much as war.", certainty: "probable", war: "interbellum" },
  { id: "e228", year: -228, title: "First Illyrian War settled", summary: "Rome imposes terms on Queen Teuta and gains a foothold of allied cities on the far Adriatic shore.", certainty: "attested", war: "interbellum" },
  { id: "e227", year: -227, title: "Sicily and Sardinia become provinces", summary: "Rome appoints two additional praetors to govern its overseas possessions — the beginning of provincial administration.", certainty: "attested", war: "interbellum" },
  { id: "e226", year: -226, title: "The Ebro agreement", summary: "Rome and Hasdrubal reportedly fix the Ebro as the limit of Carthaginian expansion, leaving what lies south of it to Carthage.", certainty: "probable", war: "interbellum" },
  { id: "e225", year: -225, title: "Gauls invade Italy", summary: "A large Gallic army crosses the Apennines and is destroyed at Telamon in Etruria, caught between two Roman armies.", certainty: "attested", war: "interbellum" },
  { id: "e224", year: -224, title: "Rome pushes into the Po", summary: "Roman armies cross the Po and force the Boii to terms, carrying the war into Cisalpine Gaul itself.", certainty: "probable", war: "interbellum" },
  { id: "e223", year: -223, title: "Campaign against the Insubres", summary: "Flaminius campaigns beyond the Po; the Insubres are defeated but not yet broken.", certainty: "probable", war: "interbellum" },
  { id: "e222", year: -222, title: "Clastidium and Mediolanum", summary: "Marcellus kills a Gallic chief in single combat at Clastidium and Rome takes Mediolanum, completing the conquest of the Po valley.", certainty: "attested", war: "interbellum" },
  { id: "e221", year: -221, title: "Hannibal takes command", summary: "Hasdrubal is assassinated. The army in Spain acclaims Hannibal, then about twenty-six, and Carthage confirms him.", certainty: "attested", war: "interbellum" },
  { id: "e220", year: -220, title: "Tension over Saguntum", summary: "Hannibal campaigns to the Tagus and Duero while Roman envoys warn him away from Saguntum, a city south of the Ebro under Roman protection.", certainty: "probable", war: "interbellum" },
];

const secondPunicEvents: HistoricalEvent[] = [
  { id: "e219", year: -219, title: "Saguntum falls", summary: "Hannibal storms Saguntum; Rome demands his surrender and, refused, declares war.", certainty: "attested", battleSlug: "saguntum", war: "second-punic" },
  { id: "e218", year: -218, title: "Hannibal crosses the Alps", summary: "After Ticinus and Trebia, Hannibal is established in northern Italy.", certainty: "attested", battleSlug: "alps-crossing", war: "second-punic" },
  { id: "e217", year: -217, title: "Ambush at Lake Trasimene", summary: "Hannibal destroys Flaminius’ army; Rome appoints Fabius Maximus dictator.", certainty: "attested", battleSlug: "trasimene", war: "second-punic" },
  { id: "e216", year: -216, title: "Catastrophe at Cannae", summary: "A vast Roman army is encircled and destroyed; several Italian communities defect.", certainty: "attested", battleSlug: "cannae", war: "second-punic" },
  { id: "e215", year: -215, title: "The war widens", summary: "Capua defects, and Carthage allies with Macedon; the conflict spreads beyond Italy.", certainty: "probable", war: "second-punic" },
  { id: "e214", year: -214, title: "Sicily changes sides", summary: "Syracuse abandons its fifty-year alliance with Rome. Marcellus crosses to Sicily and storms Leontini, and a second front opens on the island.", certainty: "probable", war: "second-punic" },
  { id: "e213", year: -213, title: "Archimedes stops an assault", summary: "Marcellus attacks Syracuse by land and sea and is beaten off outright by the engines on the walls. Rome settles down to blockade.", certainty: "attested", battleSlug: "syracuse", war: "second-punic" },
  { id: "e212", year: -212, title: "Syracuse falls; Rome invests Capua", summary: "Syracuse is taken by escalade after two years and sacked; Roman armies seal Capua behind a double line; Tarentum is lost to Hannibal.", certainty: "attested", battleSlug: "syracuse", war: "second-punic" },
  { id: "e211", year: -211, title: "Capua retaken", summary: "Hannibal’s march on Rome fails to save Capua, which surrenders and is punished.", certainty: "attested", battleSlug: "capua", war: "second-punic" },
  { id: "e210", year: -210, title: "Scipio to Spain", summary: "The young Publius Cornelius Scipio takes command of the Roman effort in Iberia.", certainty: "probable", war: "second-punic" },
  { id: "e209", year: -209, title: "New Carthage stormed", summary: "Scipio captures the Barcid capital in a single assault, seizing its resources.", certainty: "attested", battleSlug: "new-carthage", war: "second-punic" },
  { id: "e208", year: -208, title: "Baecula", summary: "Scipio defeats Hasdrubal Barca, who nonetheless escapes toward Italy.", certainty: "probable", battleSlug: "baecula", war: "second-punic" },
  { id: "e207", year: -207, title: "Decision at the Metaurus", summary: "Hasdrubal’s relieving army is destroyed before it can reach Hannibal.", certainty: "attested", battleSlug: "metaurus", war: "second-punic" },
  { id: "e206", year: -206, title: "Ilipa clears Iberia", summary: "Scipio’s victory ends Carthaginian power in Spain.", certainty: "attested", battleSlug: "ilipa", war: "second-punic" },
  { id: "e205", year: -205, title: "Preparing for Africa", summary: "Elected consul, Scipio assembles an army in Sicily for an invasion of Africa.", certainty: "probable", war: "second-punic" },
  { id: "e204", year: -204, title: "Landing in Africa", summary: "Scipio crosses to Africa and, with Masinissa, campaigns near Utica.", certainty: "probable", war: "second-punic" },
  { id: "e203", year: -203, title: "The Great Plains", summary: "Scipio wins in the Bagradas valley; Carthage recalls Hannibal from Italy.", certainty: "attested", battleSlug: "great-plains", war: "second-punic" },
  { id: "e202", year: -202, title: "Zama decides the war", summary: "Scipio defeats Hannibal in Africa in the war’s final pitched battle.", certainty: "attested", battleSlug: "zama", war: "second-punic" },
  { id: "e201", year: -201, title: "Carthage accepts terms", summary: "Carthage surrenders its fleet and Iberia, pays a large indemnity, and is barred from war without Roman consent.", certainty: "attested", war: "second-punic" },
];

const macedonianEvents: HistoricalEvent[] = [
  { id: "e200", year: -200, title: "Rome turns east", summary: "Barely out of the war with Carthage, Rome declares war on Philip V of Macedon.", certainty: "attested", war: "macedonian-second" },
  { id: "e199", year: -199, title: "War in the passes", summary: "Roman forces probe Macedonia’s western frontier with little decisive result.", certainty: "probable", war: "macedonian-second" },
  { id: "e198", year: -198, title: "Breakthrough at the Aous", summary: "Flamininus forces the Aoös gorge and pushes Philip back into Thessaly.", certainty: "attested", battleSlug: "aous", war: "macedonian-second" },
  { id: "e197", year: -197, title: "Decision at Cynoscephalae", summary: "The legion defeats the phalanx; Philip sues for peace.", certainty: "attested", battleSlug: "cynoscephalae", war: "macedonian-second" },
  { id: "e196", year: -196, title: "Freedom of the Greeks", summary: "At the Isthmian Games, Flamininus proclaims the Greek cities free — under Roman oversight.", certainty: "attested", war: "macedonian-second" },
];

export const historicalEvents: HistoricalEvent[] = [
  ...firstPunicEvents.map((event) => ({ ...event, war: "first-punic" })),
  ...interbellumEvents,
  ...secondPunicEvents,
  ...macedonianEvents,
];
