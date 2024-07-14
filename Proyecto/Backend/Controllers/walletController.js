import Wallet from '../../Models/walletModel.js';

const walletController = {
    getWallet: async (req, res) => {
        try {
            const userId = req.session.user._Id;

            let wallet = await Wallet.findOne({ user_id: userId });

            if (!wallet) {
                wallet = new Wallet({ user_id: userId });
                await wallet.save();
            }

            const totalGastos = wallet.gastos.reduce((total, gasto) => total + gasto, 0);
            const totalIngresos = wallet.ingresos.reduce((total, ingreso) => total + ingreso, 0);
            const saldo = totalIngresos - totalGastos;

            res.render('wallet', {
                totalGastos,
                totalIngresos,
                saldo
            });
        } catch (error) {
            console.error('Error al obtener la billetera:', error);
            res.status(500).send('Error al obtener la billetera');
        }
    },

    agregarIngreso: async (req, res) => {
        try {
            const userId = req.session.user._Id;
            const { cantidad } = req.body;

            const wallet = await Wallet.findOneAndUpdate(
                { user_id: userId },
                { 
                    $push: { ingresos: parseInt(cantidad) },
                    $inc: { saldo: parseInt(cantidad) }
                },
                { new: true }
            );

            res.redirect('/wallet');
        } catch (error) {
            console.error('Error al agregar ingreso:', error);
            res.status(500).send('Error al agregar ingreso');
        }
    }
};

export default walletController;
