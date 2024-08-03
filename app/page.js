'use client'
import { useState, useEffect } from "react"
import { firestore } from "@/firebase"
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material"
import { getDocs, collection, query, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore"

export default function Home() {
  //DECLARATIONS
  const [inventory, setInventory] = useState([])
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState(0)

  const [openAdd, setOpenAdd] = useState(false)
  const [openCustomAdd, setOpenCustomAdd] = useState(false)
  const [openCustomRemove, setOpenCustomRemove] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [itemExists, setItemExists] = useState('')


  //UPDATE INVENTORY FUNCTION
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

  //SINLGE ADD FUNCTION
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    
    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      setDoc(docRef,{quantity: quantity + 1})
    }
    else {
      await setDoc(docRef,{quantity: 1})
    }

    await updateInventory()
  }

  //CUSTOM ADD FUNCTION
  const addMultipleItems = async (item, amount) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    
    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      const updatedQuantity = (Number(quantity) || 0) + (Number(amount) || 0)
      await setDoc(docRef, { quantity: updatedQuantity })
    }
    else {
      await setDoc(docRef,{quantity: Number(amount)})
    }

    await updateInventory()
  }

  //SINGLE REMOVE FUNCTION
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    
    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      }
      else {
        await setDoc(docRef,{quantity: quantity - 1})
      }
    }

    await updateInventory()
  }

  //CUSTOM REMOVE FUNCTION
  const removeMultipleItems = async (item, amount) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    
    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      const currentQuantity = Number(quantity) || 0;
      const removalAmount = Number(amount) || 0;

      if (currentQuantity >= removalAmount) {
        const updatedAmount = currentQuantity - removalAmount
        await setDoc(docRef, {quantity: updatedAmount})
      }
      else {
        await deleteDoc(docRef)
      }
    }

    await updateInventory()
  }

  //SEARCH FUNCTION


  //HELPER FUNCTIONS
  useEffect(() => {
    updateInventory()
  }, [])
  
  //CHECK IF ITEM EXISTS FUNCTION
  const checkItemExists = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return setItemExists(true);
      }
  }  
  
  const handleOpenSearch = () => setOpenSearch(true)
  const handleCloseSearch = () => {
    setOpenSearch(false)
    setItemExists('')
  };

  const handleOpenAdd = () => setOpenAdd(true)
  const handleCloseAdd = () => setOpenAdd(false)

  const handleOpenCustomAdd = () => setOpenCustomAdd(true)
  const handleCloseCustomAdd = () => setOpenCustomAdd(false)

  const handleOpenCustomRemove = () => setOpenCustomRemove(true)
  const handleCloseCustomRemove = () => setOpenCustomRemove(false)

  //APP DESIGN
  return (


    <Box fullwidth="true" height="100vh" display="flex" justifyContent="center" alignItems="center" 
      gap={2} flexDirection="column" bgcolor="#white">

  <Typography variant="h1">Pantry Tracker App</Typography>

      {/** MAIN STACK FOR TOP BUTTONS */}
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">


        {/** ADD NEW ITEM */}
        <Box>
          <Modal open={openAdd} onClose={handleCloseAdd}>


            <Box position="absolute" top="50%" left="50%" width={400} bgcolor="white"
              border="2px solid #000" boxShadow={24} p={4} display="flex"
              flexDirection="column" gap={3} sx={{transform: "Translate(-50%,-50%)",}}>
              
              <Typography variant="h6">Add Item</Typography>

              <Stack width="100%" direction="row" spacing={2}>

                <TextField variant="outlined" label="New Item Name" fullwidth="true" value={itemName}
                  onChange={(e)=>{setItemName(e.target.value)}}/>

                <Button variant="contained" onClick={()=>{addItem(itemName);
                  setItemName(''); handleCloseAdd()}}>
                  ADD
                </Button>
              </Stack>    
            </Box>
          </Modal>

          <Button variant="contained" onClick={()=> {handleOpenAdd()}}>
            Add New Item
          </Button>
        </Box>

        {/** CUSTOM ADD */}
        <Box>
          <Modal open={openCustomAdd} onClose={handleCloseCustomAdd}>


            <Box position="absolute" top="50%" left="50%" width={400} bgcolor="white"
              border="2px solid #000" boxShadow={24} p={4} display="flex"
              flexDirection="column" gap={3} sx={{transform: "Translate(-50%,-50%)",}}>
                        
              <Typography variant="h6">Add Specific Amount</Typography>
              
              <Stack width="100%" direction="row" spacing={2}>
                  
                <TextField variant="outlined" fullwidth="true" label="Name"
                  onChange={(e)=>{setItemName(e.target.value)}}/>

                <TextField variant="outlined" fullwidth="true" label="Quantity" 
                  type="number" onChange={(e)=>{setItemQuantity(e.target.value)}}/>
                  
                <Button variant="contained" onClick={()=>{addMultipleItems(itemName, itemQuantity);
                  setItemName(''); setItemQuantity(0); handleCloseCustomAdd()}}>
                    ADD
                </Button>
              </Stack>              
            </Box>           
          </Modal>


          <Button variant="contained" onClick={()=> {handleOpenCustomAdd()}}>
              Custom Add
          </Button>         
        </Box>

        {/** CUSTOM REMOVE */}
        <Box>
          <Modal open={openCustomRemove} onClose={handleCloseCustomRemove}>

            <Box position="absolute" top="50%" left="50%" width={400} bgcolor="white"
              border="2px solid #000" boxShadow={24} p={4} display="flex"
              flexDirection="column" gap={3} sx={{transform: "Translate(-50%,-50%)",}}>
                        
              <Typography variant="h6">Remove Specific Amount</Typography>

              <Stack width="100%" direction="row" spacing={2}>

                <TextField variant="outlined" fullwidth="true" label="Name"
                  onChange={(e)=>{setItemName(e.target.value)}}/>

                <TextField variant="outlined" fullwidth="true" label="Quantity"
                  type="number" onChange={(e)=>{setItemQuantity(e.target.value)}}/>
                  
                <Button variant="contained" sx={{width: 200}} onClick={()=>{removeMultipleItems(itemName,
                  itemQuantity); setItemName(''); setItemQuantity(0); handleCloseCustomRemove()}}>
                    Remove
                </Button>
              </Stack>              
            </Box>           
          </Modal>


          <Button variant="contained" onClick={()=> {handleOpenCustomRemove()}}>
              Custom Remove
          </Button>
        </Box>

        {/** SEARCH BAR */}
        <Box>

          {/** When item name is typed in, this triggers a query box to open */}
          <TextField variant="outlined" width="100px" label="Search"
            onChange={(e)=>{setItemName(e.target.value)}} 
            onKeyDown={(event) => {
              if (event.key === 'Enter') {

                checkItemExists(itemName)

                if (itemExists) {
                  handleOpenSearch()
                }
                else {
                  handleOpenAdd()
                }
              }}}/>
          
          
          {/** Query box*/}
          <Modal open={openSearch} onClose={handleCloseSearch} 
            onKeyDown={(event) => {
              if (event.key === 'Esc') {
                handleCloseSearch();
              }}}>

            <Box position="absolute" top="50%" left="50%" width={400} bgcolor="white"
                border="2px solid #000" boxShadow={24} p={4} display="flex"
                flexDirection="column" gap={3} sx={{transform: "Translate(-50%,-50%)",}}>
                
                {/** Item Name Up Top */}
                <Typography variant="h6">{itemName}</Typography>

                {/** Options to Manipulate */}
                <Stack width="100%" direction="row" spacing={2}>

                    {/** Enter amount to manipulate */}
                    <TextField variant="outlined" fullwidth="true" label="Quantity"
                      type="number" onChange={(e)=>{setItemQuantity(e.target.value)}}/>
                      
                    {/** Option to Add set amount */}
                    <Button variant="contained" sx={{width: 200}} onClick={()=>{addMultipleItems(itemName,
                      itemQuantity); setItemName(''); setItemQuantity(0); handleCloseSearch()}}>
                        Add
                    </Button>
                    
                    {/** Option to Remove set amount */}

                    <Button variant="contained" sx={{width: 200}} onClick={()=>{removeMultipleItems(itemName,
                      itemQuantity); setItemName(''); setItemQuantity(0); handleCloseSearch()}}>
                        Remove
                    </Button>
                  </Stack>  
              </Box>    
          </Modal>

        </Box>
      </Stack>
      
      {/** BOX FOR THE INVENTORY CONTENT */}
      <Box border='1px solid #333'>

        {/** INVENTORY ITEMS HEADER */}
        <Box width="800px" height="100px" bgcolor="#f6f6f6" display="flex"
          alignItems="center" justifyContent="center">

          <Typography variant="h2" color="#333">
            Inventory Items
          </Typography>
        </Box>


        {/** LIST OF INVENTORY ITEMS AND THEIR INFORMATION */}
        <Stack width="800px" height="300px" spacing={2} overflow="auto">

          {inventory.map(({name, quantity}) => (

            <Box key={name} width="100%" height="50px" display="flex" alignItems="center" 
                justifyContent="space-between" bgcolor="whitesmoke" padding={5}>

              <Typography variant="h5" color="#333" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>

              <Typography variant="h5" color="#333" textAlign="center">
                {quantity}
              </Typography>

              {/** STACK OF BUTTONS FOR CUSTOMIZATION */}
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={() => {addItem(name)}}>
                  Add
                </Button>

                <Button variant="contained" onClick={() => {removeItem(name)}}>
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
  
